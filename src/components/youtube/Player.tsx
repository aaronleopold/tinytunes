import { observer } from 'mobx-react-lite';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useMst } from '../../store/store';
import Controls from './Controls';
import PlayingInfo from './PlayingInfo';

interface PlayerProps {
  index: number;
}

interface CurrentlyPlaying {
  title: string;
  videoUrl: string;
  videoId: string;
}

export default observer<PlayerProps>(({ index }) => {
  const { items } = useMst();
  const item = items[index];

  const [player, createPlayer] = useState<YT.Player | undefined>();
  const playerRef = useRef(player);

  const [playing, setPlaying] = useState(false);

  const [current, setCurrent] = useState<CurrentlyPlaying>();

  const currentRef = useRef(current);

  const showPlayingInfo = useMemo(
    () => !!player && !!current,
    [player, current]
  );
  const showControls = useMemo(() => !!player, [player]);

  function onPlayerReady(e: any) {
    if (!item.is_stream) {
      e.target.loadPlaylist({
        list: item.yt_id,
        listType: 'playlist',
        index: 0,
        startSeconds: 0,
        suggestedQuality: 'small'
      });
    }
  }

  function onPlayerStateChange(e: any) {
    const { videoUrl } = e.target.playerInfo;
    const { title, video_id } = e.target.playerInfo.videoData;

    const currentlyPlaying = e.target.getPlayerState() === 1;

    if (currentlyPlaying !== playing) {
      setPlaying(currentlyPlaying);
    }

    if (
      currentRef.current?.title !== title ||
      currentRef.current?.videoId !== video_id
    ) {
      setCurrent({ title, videoUrl, videoId: video_id });
    }
  }

  // Updating the reference to the player state, so the
  // useEffect hook underneath can properly clean up
  useEffect(() => {
    playerRef.current = player;
    currentRef.current = current;
  }, [player, current]);

  useEffect(() => {
    if (!player) {
      if (item.is_stream) {
        createPlayer(
          // @ts-ignore
          new YT.Player('player', {
            height: '300',
            width: '300',
            videoId: item.yt_id,
            playerVars: {
              controls: '0',
              autoplay: '1'
            },
            events: {
              onReady: onPlayerReady,
              onStateChange: onPlayerStateChange
            }
          })
        );
      } else {
        createPlayer(
          // @ts-ignore
          new YT.Player('player', {
            height: '300',
            width: '300',
            playerVars: {
              controls: '0'
            },
            events: {
              onReady: onPlayerReady,
              onStateChange: onPlayerStateChange
            }
          })
        );
      }

      setPlaying(true);
    }

    // on the unmount, I will eventually want to store the
    // players current position in the playlist. This cleanup
    // function will get the current playtime and playlist index
    // to be used in reinitializing the player object next time
    // this playlist is selected
    // TODO
    return () => {
      if (playerRef.current) {
        const timePlayed = playerRef.current.getCurrentTime();
        const playlistIndex = playerRef.current.getPlaylistIndex();
      }
    };
  }, []);

  const play = () => {
    playerRef.current?.playVideo();
    setPlaying(true);
  };

  const pause = () => {
    playerRef.current?.pauseVideo();
    setPlaying(false);
  };

  const skip = () => {
    playerRef.current?.nextVideo();
  };

  const replay = () => {
    if (!playerRef.current) return;

    if (item.is_stream || playerRef.current?.getCurrentTime() > 5) {
      playerRef.current?.seekTo(0, true);
    } else {
      playerRef.current?.previousVideo();
    }
  };

  return (
    <div>
      <div id="player" className="hidden" />

      {showPlayingInfo && <PlayingInfo {...current!} />}

      {showControls && (
        <Controls
          playing={playing}
          onPlay={play}
          onPause={pause}
          onSkip={skip}
          onReplay={replay}
        />
      )}
    </div>
  );
});
