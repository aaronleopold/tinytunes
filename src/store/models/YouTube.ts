import { types } from 'mobx-state-tree';

export const YouTubeItem = types
  .model({
    id: types.number,
    name: types.string,
    yt_id: types.string,
    is_stream: types.boolean
  })
  .actions(self => ({
    setName(name: string) {
      self.name = name;
    },
    setYtId(yt_id: string) {
      self.yt_id = yt_id;
    },
    setIsStream(is_stream: boolean) {
      self.is_stream = is_stream;
    }
  }));
