import { types } from 'mobx-state-tree';

interface IProgress {
  name: string;
  position: number;
  total: number;
}

const DownloaderProgress = types
  .model({
    name: types.optional(types.string, ''),
    position: types.optional(types.number, 0),
    total: types.optional(types.number, 0)
  })
  .actions(self => ({
    setName(name: string) {
      self.name = name;
    },
    setPosition(position: number) {
      self.position = position;
    },
    setTotal(total: number) {
      self.total = total;
    }
  }));

export const Downloader = types
  .model({
    isDownloading: types.optional(types.boolean, false),
    current: types.optional(DownloaderProgress, () =>
      DownloaderProgress.create({})
    )
  })
  .actions(self => ({
    setDownloading(isDownloading: boolean) {
      self.isDownloading = isDownloading;
    },
    setCurrentName(name: string) {
      self.current.setName(name);
    },
    setCurrentPosition(position: number) {
      self.current.setPosition(position);
    },
    setCurrentTotal(total: number) {
      self.current.setTotal(total);
    },
    setCurrent(current?: IProgress) {
      if (current) {
        const { name, position, total } = current;
        self.current = DownloaderProgress.create({
          name,
          position,
          total
        });
      } else {
        self.current = DownloaderProgress.create({});
      }
    }
  }))
  .actions(self => ({
    reset() {
      self.isDownloading = false;
      self.current = DownloaderProgress.create({});
    }
  }));
