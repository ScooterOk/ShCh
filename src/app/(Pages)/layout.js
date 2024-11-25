'use client';
import Navigation from '@/components/(Home)/Navigation/Navigation';
import React, { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Layout = ({ children }) => {
  const lenisRef = useRef();

  // Remove autoscroll on refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

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
