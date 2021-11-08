import { types } from 'mobx-state-tree';

interface SetInfo {
  title: string;
  videoUrl: string;
  videoId: string;
}

const Player = types
  .model({
    isPlaying: types.optional(types.boolean, false),
    title: types.optional(types.string, ''),
    videoUrl: types.optional(types.string, ''),
    videoId: types.optional(types.string, '')
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
    equals(info: SetInfo) {
      return (
        self.title === info.title &&
        self.videoUrl === info.videoUrl &&
        self.videoId === info.videoId
      );
    }
  }))
  .actions(self => ({
    set({ title, videoUrl, videoId }: SetInfo) {
      self.setTitle(title);
      self.setVideoUrl(videoUrl);
      self.setVideoId(videoId);
    },
    reset() {
      self.setIsPlaying(false);
      self.setTitle('');
      self.setVideoUrl('');
      self.setVideoId('');
    }
  }));

export default Player;
