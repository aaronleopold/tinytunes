import { types } from 'mobx-state-tree';

export enum PlayerType {
  YOUTUBE = 'YOUTUBE',
  LOCAL = 'LOCAL'
}
interface SetInfo {
  title: string;
  videoUrl: string;
  videoId: string;
  duration: number;
}

const Player = types
  .model({
    type: types.optional(
      types.enumeration(Object.keys(PlayerType)),
      PlayerType.YOUTUBE
    ),
    isPlaying: types.optional(types.boolean, false),
    title: types.optional(types.string, ''),
    videoUrl: types.optional(types.string, ''),
    videoId: types.optional(types.string, ''),
    duration: types.optional(types.number, 0),
    volume: types.optional(types.number, 0.5),
    muted: types.optional(types.boolean, false)
  })
  .actions(self => ({
    setType(type: PlayerType) {
      self.type = type;
    },
    setIsPlaying(isPlaying: boolean) {
      self.isPlaying = isPlaying;
    },
    setTitle(title: string) {
      self.title = title;
    },
    setVideoUrl(videoUrl: string) {
      self.videoUrl = videoUrl;
    },
    setVideoId(videoId: string) {
      self.videoId = videoId;
    },
    setDuration(duration: number) {
      self.duration = duration;
    },
    /**
     *
     * @param volume 0-1
     */
    setVolume(volume: number) {
      self.volume = volume;
    },
    setMuted(muted: boolean) {
      self.muted = muted;
    },
    toggleMuted() {
      self.muted = !self.muted;
    },
    equals(info: SetInfo) {
      return (
        self.title === info.title &&
        self.videoUrl === info.videoUrl &&
        self.videoId === info.videoId &&
        self.duration === info.duration
      );
    }
  }))
  .actions(self => ({
    set({ title, videoUrl, videoId, duration }: SetInfo) {
      self.setTitle(title);
      self.setVideoUrl(videoUrl);
      self.setVideoId(videoId);
      self.setDuration(duration);
    },
    reset() {
      self.setIsPlaying(false);
      self.setTitle('');
      self.setVideoUrl('');
      self.setVideoId('');
      self.setDuration(0);
      self.muted = false;
    }
  }));

export default Player;
