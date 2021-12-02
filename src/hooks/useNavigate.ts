import { useEffect, useRef } from 'react';
import {
  NavigateOptions,
  useLocation,
  useNavigate as useNaviateNative
} from 'react-router';
import Stack from '../lib/Stack';

// TODO: refactor to store state (if present?)

// it is truly amazing how many problems can be solved with two stacks lol
const forwardHistory = new Stack<string>();
const backwardHistory = new Stack<string>();

// TODO: should I try and optimize this somehow? look into this
export default function useNavigate() {
  const forwardRef = useRef(forwardHistory);
  const backwardRef = useRef(backwardHistory);

  const navigateTo = useNaviateNative();
  const location = useLocation();

  const canGoForward = () => {
    return forwardRef.current.hasStuffs();
  };

  const canGoBack = () => {
    return backwardRef.current?.hasStuffs();
  };

  const isNextRoute = (route: string) => {
    return canGoForward() && forwardRef.current.peek() === route;
  };

  const isPrevRoute = (route: string) => {
    return canGoBack() && backwardRef.current.peek() === route;
  };

  const navigate = (path: string, options?: NavigateOptions) => {
    // navigating somewhere removes the forward history
    if (forwardRef.current.hasStuffs()) {
      forwardHistory.clear();
    }

    // store current before navigating
    backwardHistory.push(location.pathname);
    navigateTo(path, options);
  };

  const goForward = () => {
    if (canGoForward()) {
      const next = forwardRef.current?.peek();

      if (next && backwardRef.current) {
        forwardHistory.pop();
        // store current before navigating
        backwardHistory.push(location.pathname);
        navigateTo(next);
      }
    }
  };

  const goBack = () => {
    if (canGoBack()) {
      const next = backwardRef.current?.peek();

      if (next) {
        backwardHistory.pop();
        // store current before navigating
        forwardHistory.push(location.pathname);
        navigateTo(next);
      }
    }
  };

  useEffect(() => {
    forwardRef.current = forwardHistory;
  }, [forwardHistory]);

  useEffect(() => {
    backwardRef.current = backwardHistory;
  }, [backwardHistory]);

  return {
    navigate,
    canGoForward,
    canGoBack,
    isNextRoute,
    isPrevRoute,
    goForward,
    goBack
  };
}
