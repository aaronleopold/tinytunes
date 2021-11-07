import { types } from 'mobx-state-tree';

import { Preferences } from './Preferences';
import { YouTubeItem } from './YouTube';

export const RootModel = types
  .model({
    items: types.optional(types.array(YouTubeItem), []),
    userPreferences: types.optional(Preferences, () =>
      Preferences.create({ width: 400, height: 500 })
    )
  })
  .actions(self => ({
    // this could be one function, but I prefer conciseness sometimes
    addPlaylist(id: number, name: string, yt_id: string) {
      self.items.push(
        YouTubeItem.create({
          id,
          name,
          yt_id,
          is_stream: false
        })
      );
    },
    addVideo(id: number, name: string, yt_id: string) {
      self.items.push(
        YouTubeItem.create({
          id,
          name,
          yt_id,
          is_stream: true
        })
      );
    },
    setWindowSize(width: number, height: number) {
      self.userPreferences.setWindowSize(width, height);
    }
  }));
