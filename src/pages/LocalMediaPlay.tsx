import React from 'react';
import { useParams } from 'react-router';

export default function LocalMediaPlay() {
  const { name } = useParams();

  if (!name) throw new Error('name is not defined');

  return <div>TODO: {name}</div>;
}
