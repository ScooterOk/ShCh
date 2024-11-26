'use client';
import clsx from 'clsx';
import React, { createContext, useState } from 'react';

export const mainContext = createContext();

const MainProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState({});
  const [noScroll, setNoScroll] = useState(true);
  const [isFocusEntered, setIsFocusEntered] = useState(false);
  const [currentFocusSlide, setCurrentFocusSlide] = useState(-1);
  const [isInit, setIsInit] = useState(false);
  const { Provider } = mainContext;

  return (
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
      }}
    >
      {children}
    </Provider>
  );
};

export default MainProvider;
