import { parse } from 'querystring';
import urlRegex from 'url-regex';

const parseYoutubeUrl = (url: string) => {
  if (!urlRegex({ exact: true }).test(url)) {
    return null;
  }

  if (url === '' || url === undefined) {
    return null;
  }

  //No query string detected
  if (!url.includes('?')) return null;

  const parts = url.split('?');

  // no params
  if (parts.length <= 1) return null;

  const queryString = parts[1];

  const parsed = parse(queryString);

  if (!parsed) {
    return null;
  }

  let is_stream = false;
  let yt_id: string;

  if (parsed.v && typeof parsed.v === 'string') {
    is_stream = true;
    yt_id = parsed.v;
  } else if (parsed.list && typeof parsed.list === 'string') {
    yt_id = parsed.list;
  } else {
    return null;
  }

  return { is_stream, yt_id };
};

export default parseYoutubeUrl;
