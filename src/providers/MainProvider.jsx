'use client';
import clsx from 'clsx';
import React, { createContext, useEffect, useState } from 'react';

export const mainContext = createContext();

const MainProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState({});
  const [noScroll, setNoScroll] = useState(true);
  const [isFocusEntered, setIsFocusEntered] = useState(false);
  const [currentFocusSlide, setCurrentFocusSlide] = useState(-1);
  const [isInit, setIsInit] = useState(false);
  const [isHolded, setIsHolded] = useState(null);
  const { Provider } = mainContext;
  const [isTouched, setIsTouched] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransition, setIsTransition] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleTouchStart = () => {
        setIsTouched(true);
      };
      window.addEventListener('touchstart', handleTouchStart, { once: true });
      return () => {
        window.removeEventListener('touchstart', handleTouchStart);
      };
    }
  }, []);

  return (
    <body className={clsx(!isLoaded && 'no-scroll')}>
      <Provider
        value={{
          isLoaded,
          setIsLoaded,
          loadedVideos,
          setLoadedVideos,
          noScroll,
          setNoScroll,
          isFocusEntered,
          setIsFocusEntered,
          isInit,
          setIsInit,
          currentFocusSlide,
          setCurrentFocusSlide,
          isHolded,
          setIsHolded,
          isTouched,
          setIsTouched,
          isMuted,
          setIsMuted,
          isTransition,
          setIsTransition,
        }}
      >
        {children}
      </Provider>
    </body>
  );
};

export default MainProvider;
