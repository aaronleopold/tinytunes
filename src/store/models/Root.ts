import { types } from 'mobx-state-tree';
import getComparer from '../../utils/compare';
import { Downloader } from './Downloader';
import Player from './Player';

import { Preferences } from './Preferences';
import { YouTubeItem } from './YouTube';

export enum MediaType {
  YOUTUBE = 'YOUTUBE',
  LOCAL = 'LOCAL'
}

export const RootModel = types
  .model({
    items: types.optional(types.array(YouTubeItem), []),
    sortBy: types.optional(types.string, 'playlist'),
    userPreferences: types.optional(Preferences, () =>
      Preferences.create({ width: 400, height: 500, dark_theme: true })
    ),
    playerInfo: types.optional(Player, () => Player.create({})),
    mediaType: types.optional(
      types.enumeration(Object.keys(MediaType)),
      MediaType.YOUTUBE
    ),
    downloadInfo: types.optional(Downloader, () => Downloader.create({}))
  })
  .actions(self => ({
    sort() {
      const comparer = getComparer(self.sortBy);

      self.items.sort(comparer);
    }
  }))
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

      self.sort();
    },
    setMediaType(mediaType: MediaType) {
      self.mediaType = mediaType;
    },
    setSortBy(sortBy: string) {
      if (self.sortBy === sortBy && sortBy === 'name') {
        self.sortBy = 'name_reverse';
      } else {
        self.sortBy = sortBy;
      }

      self.sort();
    },
    setWindowSize(width: number, height: number) {
      self.userPreferences.setWindowSize(width, height);
    }
  }));
