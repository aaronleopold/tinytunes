import { useEffect, useRef } from 'react';
import { useLocation, useNavigate as useNaviateNative } from 'react-router';
import Stack from '../lib/Stack';

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

  const navigate = (path: string) => {
    // navigating somewhere removes the forward history
    if (forwardRef.current.hasStuffs()) {
      forwardHistory.clear();
    }

    // store current before navigating
    backwardHistory.push(location.pathname);
    navigateTo(path);
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

      console.log(next);

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
    goForward,
    goBack
  };
}
