import React from 'react';

// these are shared types

export interface DefaultProps {
  children: React.ReactNode;
}

export interface GetLocalMediaReturn {
  path: string;
  name: string;
  is_dir: boolean;
}

export type LocalMediaEntry = Omit<GetLocalMediaReturn, 'is_dir'>;
