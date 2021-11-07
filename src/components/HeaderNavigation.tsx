import { CaretLeft, CaretRight } from 'phosphor-react';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Button from './ui/Button';

const HeaderNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: there must be a better way to do this than manually checking
  // each route's available forward/backward navigation.
  // TODO: figure out how to access history? if there is previous state,
  // then can go back, if not then can't go back.
  const canNavigationForward = useCallback(() => {
    return location.pathname === '/';
  }, [location]);

  const canNavigationBackward = useCallback(() => {
    return location.pathname === '/settings';
  }, [location]);

  // FIXME: these are not really correct
  // I need to use history somehow here
  const navigateForward = () => {
    // history.forward();
    navigate('/settings');
  };

  const navigateBackward = () => {
    navigate('..');
  };

  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <Button
        variant="tiny"
        className="rounded-l-md"
        disabled={!canNavigationBackward()}
        onClick={navigateBackward}
      >
        <CaretLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="tiny"
        className="-ml-px rounded-r-md"
        disabled={!canNavigationForward()}
        onClick={navigateForward}
      >
        <CaretRight className="h-4 w-4" />
      </Button>
    </span>
  );
};

export default HeaderNavigation;
