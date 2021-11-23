import React from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';

import useNavigate from '../hooks/useNavigate';
import Button from './ui/Button';

const HeaderNavigation: React.FC = () => {
  const { goBack, goForward, canGoBack, canGoForward } = useNavigate();

  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <Button
        variant="tiny"
        className="rounded-l-md"
        disabled={!canGoBack()}
        onClick={goBack}
      >
        <CaretLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="tiny"
        className="-ml-px rounded-r-md"
        disabled={!canGoForward()}
        onClick={goForward}
      >
        <CaretRight className="h-4 w-4" />
      </Button>
    </span>
  );
};

export default HeaderNavigation;
