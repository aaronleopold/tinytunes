import React, { useMemo } from 'react';
import { SubText } from '../../ui/Text';

interface Props {
  position: number;
  total: number;
}

export default function DownloadProgress({ position, total }: Props) {
  const percent = useMemo(() => {
    if (total > 0) {
      const rounded = Math.round((position / total) * 100);
      return rounded < 100 ? rounded : 100;
    }

    return 0;
  }, [position, total]);

  console.log(percent);

  return (
    <div className="w-full flex items-center">
      <div className="h-1 w-[80%] bg-gray-400 mx-auto rounded-md">
        <div
          className="h-full bg-gray-50 rounded-md transition-width ease-linear duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <SubText>{percent}%</SubText>
    </div>
  );
}
