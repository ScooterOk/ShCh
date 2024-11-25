'use client';
import { useCallback, useContext, useEffect, useRef } from 'react';
import styles from './page.module.scss';

import Loader from '@/components/Loader/Loader';
import { mainContext } from '@/providers/MainProvider';
import Hero from '@/features/(Homepage)/Hero/Hero';
import FocusOn from '@/features/(Homepage)/FocusOn/FocusOn';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLenis } from 'lenis/react';
import Works from '@/features/(Homepage)/Works/Works';
import Follow from '@/features/(Homepage)/Follow/Follow';
import Footer from '@/components/Footer/Footer';
// import FocusOn from '@/features/(Homepage)/FocusOn/FocusOn';

let scrollTrigger;
let scrollTween;
let cubeRotationTween;

let cubeRotationActive = false;

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
      setCurrentFocusSlide(index);
    },
    [setCurrentFocusSlide]
  );

  useGSAP(
    () => {
      if (lenis) {
        lenis.slideindex = -1;
        let scrollTweenActive = false;
        lenis.stop();
        scrollTrigger = ScrollTrigger.observe({
          type: 'wheel,touch',
          onUp: () => {
            if (
              lenis.slideindex === -1 ||
              cubeRotationActive ||
              !lenis.isStopped ||
              gsap.getById('scrollTween')
            )
              return;
            if (lenis.slideindex === 0) {
              const isActive = scrollTween?.isActive();
              if (isActive) return;
              scrollTween = gsap.to(window, {
                duration: 1,
                scrollTo: 0,
                ease: 'power1.inOut',
              });
            }
            cubeRotationActive = true;
            setTimeout(() => (cubeRotationActive = false), 1000);
            lenis.slideindex--;
            handleChangeSlide(lenis.slideindex);
          },
          onDown: () => {
            if (scrollTweenActive || !lenis.isStopped) return;
            if (lenis.slideindex === -1) {
              scrollTweenActive = true;
              setCurrentFocusSlide(0);
              lenis.slideindex++;
              gsap.to(window, {
                id: 'scrollTween',
                duration: 1,
                scrollTo: cubeRef.current,
                ease: 'power1.inOut',
                onComplete: () => (scrollTweenActive = false),
              });
            } else {
              if (cubeRotationActive || lenis.slideindex === 3) return;
              cubeRotationActive = true;
              setTimeout(() => (cubeRotationActive = false), 1000);
              lenis.slideindex++;
              handleChangeSlide(lenis.slideindex);
            }
          },
          tolerance: 100,
          // preventDefault: true,
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
      <Works />
      <Follow />
      <Footer />
      {!isLoaded && (
        <Loader setIsLoaded={setIsLoaded} setNoScroll={setNoScroll} />
      )}
    </main>
  );
}
