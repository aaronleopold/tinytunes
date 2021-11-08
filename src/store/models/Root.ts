import { types } from 'mobx-state-tree';
import Player from './Player';

import { Preferences } from './Preferences';
import { YouTubeItem } from './YouTube';

export const RootModel = types
  .model({
    items: types.optional(types.array(YouTubeItem), []),
    userPreferences: types.optional(Preferences, () =>
      Preferences.create({ width: 400, height: 500, dark_theme: true })
    ),
    playerInfo: types.optional(Player, () => Player.create({}))
  })
  .actions(self => ({
    addItem(id: number, name: string, yt_id: string, is_stream: boolean) {
      self.items.push(
        YouTubeItem.create({
          id,
          name,
          yt_id,
          is_stream
        })
      );
    },
    setWindowSize(width: number, height: number) {
      self.userPreferences.setWindowSize(width, height);
    }
  }));
