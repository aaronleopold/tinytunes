import axios from 'axios';

// @ts-ignore: stinky intellisense
const API_KEY = import.meta.env.VITE_GIFY_API_KEY;

interface Gif {
  id: string;
  title: string;
}

export const gifs = [
  { id: 'BMu2SwuXflOlQP8jTC', title: 'Anime Cup' },
  { id: '84SFZf1BKgzeny1WxQ', title: '80s Synthwave Aesthetic' },
  { id: 'kMqJ9CL7656fK', title: 'Studying' },
  { id: '1yld7nW3oQ2IyRubUm', title: 'Fantasy Campfire' },
  { id: '3dhmyq6EKw2x7eFt4X', title: 'Rainy, Futuristic City' },
  { id: '1Ye7CiFf0OvUaJ82A2', title: 'Anime Gif Garden of Words Aesthetic' },
  { id: '6baW5lF9UxI6lfpc0c', title: 'Anime Aesthetic Phone Call' },
  { id: 'SWhsTrEYSrGd4CAhNC', title: '90s Anime Wave Anime Aesthetic' },
  { id: '4ilFRqgbzbx4c', title: 'Cowboy Bebop' },
  { id: '5e25aUTZPcI94uMZgv', title: 'Synthwave Aesthetic Pixel Art' },
  { id: 'k81NasbqkKA5HSyJxN', title: 'Raining Storefront' },
  { id: 'lkceXNDw4Agryfrwz8', title: 'Pixel Jeff Raining Cinema' },
  { id: 'TLOl2tSYNSZM0KnpcE', title: 'Fabiocoelho Gif' },
  { id: 'gH1jGsCnQBiFHWMFzh', title: 'Pixel Jeff Machines' },
  { id: 'ckr4W2ppxPBeIF8dx4', title: 'Pixel Jeff Eating' },
  { id: '2eKfFHjb30D9tDdJ59', title: 'Flashing Sign' },
  { id: 'H62NM1ab7wzMXURdoi', title: 'Ponder Rainy Day by Uncute' },
  { id: 'XbJYBCi69nyVOffLIU', title: 'Anime Girl' },
  { id: 'WTiJwq5cEY1gsRHJt9', title: 'Cats Studying by Little Gaby' },
  { id: 'TiOBBBMHnnfqyBZobs', title: 'Stargazing by Fabiocoelho' },
  { id: 'Q5EgKodVk5SyAOqAs5', title: 'Thunderstorm' },
  { id: 'MU56lYT1Ov07fVTsnM', title: 'Gif by Chillhop Music' },
  { id: 'J2xu0qtPUj6jvts4Wg', title: 'Hip Hop Manchester by Thebodhiagency' },
  { id: 'QxSveBdhdtLgagcKdR', title: 'Indoor Aquarium by Fabiocoielho' },
  { id: 'RcRYrpC1pBvIB0icDm', title: 'Large Sunset Drive' },
  { id: 'ZCSZp478OpzSMpAAFc', title: 'Dark Lit Room by Fabiocoelho' },
  { id: 'fwtYgX4buYMJw0hJeA', title: 'Music Friends Car' }
  // { id: 'TODO', title: '' },
  // { id: 'TODO', title: '' },
  // { id: 'TODO', title: '' },
  // { id: 'TODO', title: '' },
  // { id: 'TODO', title: '' },
  // { id: 'TODO', title: '' },
  // { id: 'TODO', title: '' },
  // { id: 'TODO', title: '' },
  // { id: 'TODO', title: '' },
];

const fallbacks = [
  'animecup.gif',
  'default.gif',
  'lifeinjapan.gif',
  'stay.gif',
  'townatnight.gif',
  'waiting.gif',
  'waneela.gif'
];

const getRandomGif = async () => {
  console.log('getting random gif');
  const randomIndex = Math.floor(Math.random() * gifs.length);
  const gif = gifs[randomIndex];

  const response = await axios
    .get(`https://api.giphy.com/v1/gifs/${gif.id}?api_key=${API_KEY}`)
    .catch(err => err.response);

  if (response?.status !== 200) {
    const randomFallbackIndex = Math.floor(Math.random() * fallbacks.length);
    const fallback = fallbacks[randomFallbackIndex];
    return `/gifs/${fallback}`;
  }

  const { data } = response;

  // hate this >:(
  const imageData = data.data.images;

  if (imageData.downsized_large) {
    return imageData.downsized_large.url;
  } else {
    return imageData.original.url;
  }
};

export default getRandomGif;
