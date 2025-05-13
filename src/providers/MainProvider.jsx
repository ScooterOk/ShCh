'use client';
import clsx from 'clsx';
import React, { createContext, useCallback, useState } from 'react';

export const mainContext = createContext();

const MainProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [loadedMedia, setLoadedMedia] = useState({});
  const [noScroll, setNoScroll] = useState(true);
  const [isFocusEntered, setIsFocusEntered] = useState(false);
  const [currentFocusSlide, setCurrentFocusSlide] = useState(-1);
  const [currentDescriptionSlide, setCurrentDescriptionSlide] = useState(-1);
  const [isInit, setIsInit] = useState(false);
  const [isHolded, setIsHolded] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransition, setIsTransition] = useState(null);

  const { Provider } = mainContext;

  const resetMainProviderData = useCallback(() => {
    setCurrentFocusSlide(-1);
    setCurrentDescriptionSlide(-1);
    setIsLoaded(false);
    // setIsNavigationReady(false);
    setNoScroll(true);
    setIsFocusEntered(false);
    setIsInit(false);
    setIsHolded(null);
    setIsTransition(null);
  }, []);

  return (
    <body className={clsx(!isLoaded && 'no-scroll')}>
      <Provider
        value={{
          resetMainProviderData,
          isLoaded,
          setIsLoaded,
          isNavigationReady,
          setIsNavigationReady,
          loadedMedia,
          setLoadedMedia,
          noScroll,
          setNoScroll,
          isFocusEntered,
          setIsFocusEntered,
          isInit,
          setIsInit,
          currentFocusSlide,
          setCurrentFocusSlide,
          currentDescriptionSlide,
          setCurrentDescriptionSlide,
          isHolded,
          setIsHolded,
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
