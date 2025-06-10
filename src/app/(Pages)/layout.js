'use client';
import Navigation from '@/components/Navigation/Navigation';
import React, { useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollBar from '@/components/ScrollBar/ScrollBar';
import TransitionAnimation from '@/components/TransitionAnimation/TransitionAnimation';
import HoverSound from '@/components/HoverSound';
import useMobile from '@/hooks/useMobile';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Layout = ({ children }) => {
  const lenisRef = useRef();
  const { isTouch } = useMobile();

  // useEffect(() => {
  //   function update(time) {
  //     lenisRef.current?.lenis?.raf(time * 1000);
  //   }
  //   gsap.ticker.add(update);
  //   return () => gsap.ticker.remove(update);
  // }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      // autoRaf={false}
      options={{
        syncTouch: true,
        duration: 1,
        prevent: () => isTouch,
      }}
    >
      <TransitionAnimation />
      <Navigation />
      <ScrollBar />
      <HoverSound />
      {children}
    </ReactLenis>
  );
};

export default Layout;
