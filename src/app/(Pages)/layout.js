'use client';
import Navigation from '@/components/(Home)/Navigation/Navigation';
import React, { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';

// gsap.ticker.fps(120);
// gsap.ticker.lagSmoothing(500, 33);

const Layout = ({ children }) => {
  const lenisRef = useRef();

  // useEffect(() => {

  //   function update(time) {
  //     lenisRef.current?.lenis?.raf(time * 1000);
  //   }
  //   gsap.ticker.add(update);
  //   return () => {
  //     gsap.ticker.remove(update);
  //   };
  // });
  return (
    <ReactLenis
      root
      ref={lenisRef}
      // autoRaf={false}
      options={{ duration: 1, syncTouch: true }}
    >
      <Navigation />
      {children}
    </ReactLenis>
  );
};

export default Layout;
