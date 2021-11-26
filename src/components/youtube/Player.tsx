import { observer } from 'mobx-react-lite';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import useKeyboardHandler from '../../hooks/useKeyboardHandler';
import { useMst } from '../../store/store';
import Loader from '../ui/Loader';
import Controls from './controls/Controls';
import getRandomGif from '../../utils/gifs';
import PlayingInfo from './PlayingInfo';

interface PlayerProps {
  index: number;
}

// TODO: remove these logs, keeping for now to make sure I'm not rerendering too much
const Player: React.FC<PlayerProps> = ({ index }) => {
  const { items, playerInfo } = useMst();

  const item = items[index];

  const [player, setPlayer] = useState<YT.Player | null>(null);
  const playerRef = useRef(player);

  const [gif, setGif] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  const onPlayerReady = (e: YT.PlayerEvent) => {
    if (!item.is_stream) {
      console.log('current quality:', e.target.getPlaybackQuality());
      e.target.loadPlaylist({
        list: item.yt_id,
        listType: 'playlist',
        index: 0,
        startSeconds: 0
      });
    }
  };

  const onPlayerStateChange = useCallback(
    (e: any) => {
      console.log('state changed:', e);

      const { videoUrl, duration } = e.target.playerInfo;
      const { title, video_id } = e.target.playerInfo.videoData;

      if (playerInfo.title !== title || playerInfo.duration !== duration) {
        console.log('update triggered from state change');
        playerInfo.set({ title, videoUrl, videoId: video_id, duration });
      }
    },
    [playerInfo]
  );

  const onQualityChange = (e: any) => {
    console.log('quality changed:', e);
  };

  const onPlayerError = (e: any) => {
    console.log('ERROR OCCURRED:', e);

    console.log('DEBUG TEXT:', e.target.getDebugText());

    console.log('PLAYBACK QUALITY:', e.target.getPlaybackQuality());

    if (e.target.getPlaybackQuality() === 'unknown') {
      console.log('AGH stinky bug!');
    }

    // e.target.
  };

  const createPlaylistPlayer = () => {
    // @ts-ignore
    return new YT.Player('player', {
      height: '300',
      width: '300',
      volume: playerInfo.volume * 100,
      playerVars: {
        controls: '0'
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onPlayerError
      }
    });
  };

  const createVideoPlayer = () => {
    // @ts-ignore
    return new YT.Player('player', {
      height: '300',
      width: '300',
      videoId: item.yt_id,
      volume: playerInfo.volume * 100,
      playerVars: {
        controls: '0',
        autoplay: '1'
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onPlaybackQualityChange: onQualityChange,
        onError: onPlayerError
      }
    });
  };

  const getGif = async () => {
    const newGif = await getRandomGif();
    setGif(newGif);
  };

  useEffect(() => {
    if (playerRef.current !== player) {
      playerRef.current = player;
    }
  }, [player]);

  useEffect(() => {
    if (playerInfo.title) {
      getGif();
    }
  }, [playerInfo.title]);

  useEffect(() => {
    if (!player) {
      if (item.is_stream) {
        setPlayer(createVideoPlayer());
      } else {
        setPlayer(createPlaylistPlayer());
      }

      playerInfo.setIsPlaying(true);

      if (loading) {
        setTimeout(() => setLoading(false), 200);
      }
    }

    return () => {
      playerInfo.reset();
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && playerInfo.volume <= 1) {
      playerRef.current.setVolume(playerInfo.volume * 100);
    }
  }, [playerInfo.volume]);

  /**
   *
   * @param value 0-100
   */
  const setVolume = (value: number) => {
    const small = value / 100;
    playerInfo.setVolume(small > 1 ? 1 : small);
    playerRef.current?.setVolume(value);
  };

  const toggleMute = () => {
    if (playerInfo.muted) {
      playerRef.current?.unMute();
    } else {
      playerRef.current?.mute();
    }

    playerInfo.toggleMuted();
  };

  const reduceVolume = () => {
    if (playerRef.current) {
      const volume = playerRef.current.getVolume();
      setVolume(volume - 5);
    }
  };

  const increaseVolume = () => {
    if (playerRef.current) {
      if (playerInfo.muted) {
        setVolume(0);
        toggleMute();
      } else {
        const volume = playerRef.current.getVolume();
        setVolume(volume + 5);
      }
    }
  };

  const play = () => {
    playerRef.current?.playVideo();
    // there seems to be about a 200ms delay, this could just be my machine so
    // TODO: test this delay on other machines.
    setTimeout(() => playerInfo.setIsPlaying(true), 200);
  };

  const pause = () => {
    playerRef.current?.pauseVideo();
    setTimeout(() => playerInfo.setIsPlaying(false), 200);
  };

  const togglePlay = useCallback(() => {
    if (playerInfo.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [playerInfo.isPlaying]);

  const skip = item.is_stream
    ? undefined
    : () => {
        playerRef.current?.nextVideo();
      };

  const replay = item.is_stream
    ? undefined
    : () => {
        if (!playerRef.current) return;

        if (item.is_stream || playerRef.current?.getCurrentTime() > 5) {
          playerRef.current?.seekTo(0, true);
        } else {
          playerRef.current?.previousVideo();
        }
      };

  const seekTo = (value: number) => {
    playerRef.current?.seekTo(value, true);
  };

  const showGif = useMemo(() => !!gif && !loading, [gif, loading]);
  const showControls = useMemo(() => !!player, [player]);

  useKeyboardHandler([
    {
      key: 'ArrowRight',
      callback: skip
    },
    {
      key: 'ArrowLeft',
      callback: replay
    },
    {
      key: 'ArrowUp',
      callback: increaseVolume
    },
    {
      key: 'ArrowDown',
      callback: reduceVolume
    },
    {
      key: ' ',
      callback: togglePlay
    },
    {
      key: 'm',
      callback: toggleMute
    }
  ]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div id="player" className="hidden" />

      {playerInfo.title && (
        <PlayingInfo
          title={playerInfo.title}
          videoUrl={playerInfo.videoUrl}
          videoId={playerInfo.videoId}
        />
      )}

      <Loader active={loading} />

      {showGif && (
        <img
          className="border-none absolute object-cover w-screen h-full"
          src={gif}
        />
      )}

      {showControls && (
        <Controls
          playing={playerInfo.isPlaying}
          onPlay={play}
          onPause={pause}
          onSkip={skip}
          onReplay={replay}
          setVolume={setVolume}
          seekTo={seekTo}
          getNewGif={getGif}
        />
      )}
    </div>
  );
};

export default observer(Player);
