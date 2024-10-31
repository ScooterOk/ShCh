'use client';
import { useCallback, useContext, useRef } from 'react';
import styles from './page.module.scss';

import Loader from '@/components/Loader/Loader';
import { mainContext } from '@/providers/MainProvider';
import Hero from '@/pages/(Homepage)/Hero/Hero';
import FocusOn from '@/pages/(Homepage)/FocusOn/FocusOn';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { useLenis } from 'lenis/react';
// import FocusOn from '@/pages/(Homepage)/FocusOn/FocusOn';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let scrollTrigger;
let scrollTween;
let cubeRotationTween;

export default function Home() {
  const {
    isLoaded,
    setIsLoaded,
    setNoScroll,
    currentFocusSlide,
    setCurrentFocusSlide,
    isCubeRotating,
  } = useContext(mainContext);

  const heroRef = useRef();
  const cubeRef = useRef();

  const lenis = useLenis();

  const handleChangeSlide = useCallback(
    (index) => {
      console.log('Down');

      // gsap.globalTimeline
      //   .getChildren()
      //   .forEach((tween) => console.log('tween', tween));
      if (gsap.globalTimeline.getById('scooterok')) return;
      setCurrentFocusSlide(index);
    },
    [setCurrentFocusSlide]
  );

  useGSAP(
    () => {
      if (lenis) {
        let index = -1;
        lenis.stop();
        scrollTrigger = ScrollTrigger.observe({
          type: 'wheel,touch',
          onUp: () => {
            if (gsap.globalTimeline.getById('cube-rotation')) return;
            if (index === 0) {
              const isActive = scrollTween?.isActive();
              if (isActive) return;
              setCurrentFocusSlide(-1);
              index--;
              scrollTween = gsap.to(window, {
                duration: 1,
                scrollTo: 0,
                ease: 'power1.inOut',
              });
            }
            console.log('Up', index);
            index--;
            handleChangeSlide(index);
          },
          onDown: () => {
            if (index === -1) {
              const isActive = scrollTween?.isActive();
              if (isActive) return;
              setCurrentFocusSlide(0);
              index++;
              scrollTween = gsap.to(window, {
                duration: 1,
                scrollTo: cubeRef.current,
                ease: 'power1.inOut',
              });
            } else {
              if (gsap.globalTimeline.getById('cube-rotation')) return;
              index++;
              handleChangeSlide(index);
            }
          },
          tolerance: 10,
          preventDefault: true,
        });
      }
    },
    { dependencies: [lenis] }
  );

  return (
    <main className={styles.main}>
      <button
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
        onClick={() => {
          console.log('onClick');
          gsap.to(window, {
            duration: 1,
            scrollTo: cubeRef.current,
            ease: 'power1.inOut',
          });
        }}
      >
        Scroll To {currentFocusSlide}
      </button>
      <div ref={heroRef}>
        <Hero isLoaded={isLoaded} />
      </div>

      <div ref={cubeRef}>
        <FocusOn />
      </div>
      <div style={{ height: '100vh' }}></div>
      {!isLoaded && (
        <Loader setIsLoaded={setIsLoaded} setNoScroll={setNoScroll} />
      )}
    </main>
  );
}
