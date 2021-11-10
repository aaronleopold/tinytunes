import { types } from 'mobx-state-tree';

interface SetInfo {
  title: string;
  videoUrl: string;
  videoId: string;
  duration: number;
}

const Player = types
  .model({
    isPlaying: types.optional(types.boolean, false),
    title: types.optional(types.string, ''),
    videoUrl: types.optional(types.string, ''),
    videoId: types.optional(types.string, ''),
    duration: types.optional(types.number, 0)
  })
  .actions(self => ({
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
    }
  }));

export default Player;
