import React from 'react';
import { useParams } from 'react-router';
import Player from '../components/youtube/Player';

export default function YouTubePlay() {
  const { index } = useParams();

  if (!index) throw new Error('index is not defined');

  return <Player index={parseInt(index, 10)} />;
}
