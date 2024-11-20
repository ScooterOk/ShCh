'use client';
import Navigation from '@/components/(Home)/Navigation/Navigation';
import React, { useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// gsap.ticker.fps(30);

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
