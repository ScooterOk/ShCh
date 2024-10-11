'use client';
import clsx from 'clsx';
import React, { createContext, useState } from 'react';

export const mainContext = createContext({ name: 'Scooter)Ok' });

const MainProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [noScroll, setNoScroll] = useState(true);
  const { Provider } = mainContext;

  return (
    <body className={clsx(noScroll && 'no-scroll')}>
      <Provider value={{ isLoaded, setIsLoaded, noScroll, setNoScroll }}>
        {children}
      </Provider>
    </body>
  );
};

export default MainProvider;
