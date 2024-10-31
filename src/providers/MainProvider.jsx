'use client';
import clsx from 'clsx';
import React, { createContext, useRef, useState } from 'react';

export const mainContext = createContext();

const MainProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [noScroll, setNoScroll] = useState(false);
  const [isFocusEntered, setIsFocusEntered] = useState(false);
  const [currentFocusSlide, setCurrentFocusSlide] = useState(-1);
  const [isInit, setIsInit] = useState(false);
  const { Provider } = mainContext;

  return (
    <body className={clsx(noScroll && 'no-scroll')}>
      <Provider
        value={{
          isLoaded,
          setIsLoaded,
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
    </body>
  );
};

export default MainProvider;
