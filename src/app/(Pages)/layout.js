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
