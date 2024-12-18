'use client';
import { useCallback, useContext, useEffect, useRef } from 'react';

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

import styles from './page.module.scss';
import { Observer } from 'gsap/Observer';
import useMobile from '@/hooks/useMobile';

let scrollTween;

let cubeRotationActive = false;

export default function Home() {
  const {
    isLoaded,
    setIsLoaded,
    noScroll,
    currentFocusSlide,
    setCurrentFocusSlide,
    setIsInit,
  } = useContext(mainContext);

  const mainContainerRef = useRef();
  const heroRef = useRef();
  const cubeRef = useRef();

  const lenis = useLenis();

  const { isMobile } = useMobile();

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
        if (noScroll) return;

        const handleUp = () => {
          if (
            lenis.slideindex === -1 ||
            cubeRotationActive ||
            !lenis.isStopped ||
            scrollTweenActive ||
            gsap.getById('scrollTween')
          )
            return;
          console.log('handleUp');

          if (lenis.slideindex === 0) {
            setIsInit(false);
            scrollTweenActive = true;
            scrollTween = gsap.to(window, {
              duration: 1,
              scrollTo: 0,
              ease: 'power1.inOut',
              onComplete: () => (scrollTweenActive = false),
            });
          }
          cubeRotationActive = true;
          setTimeout(() => (cubeRotationActive = false), 1000);
          lenis.slideindex--;
          handleChangeSlide(lenis.slideindex);
        };
        const handleDown = () => {
          if (scrollTweenActive || !lenis.isStopped || noScroll) return;
          if (lenis.slideindex === -1) {
            scrollTweenActive = true;
            setCurrentFocusSlide(0);
            lenis.slideindex++;
            gsap
              .timeline()
              .to(window, {
                id: 'scrollTween',
                duration: 1,
                scrollTo: cubeRef.current,
                ease: 'power1.inOut',
              })
              .add(() => (scrollTweenActive = false), '+=1');
          } else {
            if (cubeRotationActive || lenis.slideindex === 3) return;
            cubeRotationActive = true;
            setTimeout(() => (cubeRotationActive = false), 1000);
            lenis.slideindex++;
            handleChangeSlide(lenis.slideindex);
          }
        };

        ScrollTrigger.observe({
          type: 'wheel,touch',
          id: 'scroll-trigger-observe',
          onUp: (e) => {
            if (e.event.type === 'wheel') handleUp();
            if (e.event.type === 'touchmove') handleDown();
          },
          onDown: (e) => {
            if (e.event.type === 'wheel') handleDown();
            if (e.event.type === 'touchmove') handleUp();
          },
          tolerance: 100,
          // preventDefault: true,
        });

        if (isMobile) {
          const observer = Observer.getById('scroll-trigger-observe');
          observer.disable();
          lenis.start();
        }
      }
    },
    { dependencies: [lenis, noScroll] }
  );

  // TODO: fix on mobile
  useEffect(() => {
    const observer = Observer.getById('scroll-trigger-observe');
    if (lenis && observer && currentFocusSlide === -1) {
      if (isMobile) {
        observer.disable();
        lenis.start();
      } else {
        observer.enable();
        if (currentFocusSlide < 2) lenis.stop();
        if (currentFocusSlide === -1) window.scrollTo(0, 0);
      }
    }
    // eslint-disable-next-line
  }, [isMobile, lenis]);

  return (
    <main ref={mainContainerRef} className={styles.main}>
      <div ref={heroRef}>
        <Hero isLoaded={isLoaded} />
      </div>

      <div ref={cubeRef}>
        <FocusOn />
      </div>
      <Works />
      <Follow />
      <Footer />
      {!isLoaded && <Loader setIsLoaded={setIsLoaded} />}
    </main>
  );
}
