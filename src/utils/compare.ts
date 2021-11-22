import { YouTubeItem } from '../@types/store';

type Comparator = (a: YouTubeItem, b: YouTubeItem) => number;

const sortByPlaylist: Comparator = (a, b) => {
  return a.is_stream == b.is_stream ? 0 : a.is_stream ? 1 : -1;
};

const sortByVideo: Comparator = (a, b) => {
  return a.is_stream == b.is_stream ? 0 : a.is_stream ? -1 : 1;
};

const sortByName: Comparator = (a, b) => {
  return a.name.localeCompare(b.name);
};

const sortByNameReverse: Comparator = (a, b) => {
  return b.name.localeCompare(a.name);
};

export default function getComparer(sortBy: string) {
  switch (sortBy.toLowerCase()) {
    case 'video':
      return sortByVideo;
    case 'name':
      return sortByName;
    case 'name-reverse':
      return sortByNameReverse;
    default:
      return sortByPlaylist;
  }
}
