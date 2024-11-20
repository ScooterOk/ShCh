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

import { useLenis } from 'lenis/react';
import Works from '@/pages/(Homepage)/Works/Works';
import Follow from '@/pages/(Homepage)/Follow/Follow';
import Footer from '@/components/Footer/Footer';
// import FocusOn from '@/pages/(Homepage)/FocusOn/FocusOn';

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
        return;
        let index = -1;
        let scrollTweenActive = false;
        lenis.stop();
        scrollTrigger = ScrollTrigger.observe({
          type: 'wheel,touch',
          onUp: () => {
            if (index === -1 || gsap.globalTimeline.getById('cube-rotation'))
              return;
            if (index === 0) {
              const isActive = scrollTween?.isActive();
              if (isActive) return;
              scrollTween = gsap.to(window, {
                duration: 1,
                scrollTo: 0,
                ease: 'power1.inOut',
              });
            }
            index--;
            handleChangeSlide(index);
          },
          onDown: () => {
            console.log('scrollTweenActive', scrollTweenActive, index);
            if (scrollTweenActive) return;
            if (index === -1) {
              scrollTweenActive = true;
              setCurrentFocusSlide(0);
              index++;
              gsap.to(window, {
                id: 'scrollTween',
                duration: 1,
                scrollTo: cubeRef.current,
                ease: 'power1.inOut',
                onComplete: () => (scrollTweenActive = false),
              });
            } else {
              if (gsap.globalTimeline.getById('cube-rotation') || index === 3)
                return;
              index++;
              handleChangeSlide(index);
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
