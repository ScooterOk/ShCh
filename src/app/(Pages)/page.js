'use client';
import { useCallback, useContext, useEffect, useRef } from 'react';

import Loader from '@/components/Loader/Loader';
import { mainContext } from '@/providers/MainProvider';
import Hero from '@/features/Homepage/Hero/Hero';
import FocusOn from '@/features/Homepage/FocusOn/FocusOn';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLenis } from 'lenis/react';
import Works from '@/features/Homepage/Works/Works';
import Follow from '@/features/Homepage/Follow/Follow';
import Footer from '@/components/Footer/Footer';

import styles from './page.module.scss';
import { Observer } from 'gsap/Observer';
import useMobile from '@/hooks/useMobile';
import AllWorks from '@/features/Homepage/AllWorks/AllWorks';

let cubeRotationActive = false;
let scrollTweenActive = false;

const medialist = [
  '/video/Hero_head_video_01.mp4',
  '/video/Hero_head_video_02.mp4',
  '/video/showreel_preview.mp4',
  '/video/CUBE_01_full.mp4',
  '/video/CUBE_02_full.mp4',
  '/video/CUBE_03_full.mp4',
  '/video/CUBE_04_full.mp4',
  '/video/allworks.mp4',
  '/models/home_hero_title.gltf',
  '/models/home_hero_title_mobile.gltf',
  '/models/works.gltf',
  '/models/viewall.gltf',
  '/models/viewall_mobile.gltf',
  '/models/follow.gltf',
  '/video/audio_hover.mp3',
  '/models/lets.gltf',
];

export default function Home() {
  const {
    isLoaded,
    noScroll,
    currentFocusSlide,
    setCurrentFocusSlide,
    setIsInit,
    setIsHolded,
    resetMainProviderData,
  } = useContext(mainContext);

  // useEffect(() => {
  //   resetMainProviderData();
  // }, [resetMainProviderData]);

  useEffect(() => {
    return () => resetMainProviderData();
  }, [resetMainProviderData, setCurrentFocusSlide]);

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

  const handleUp = useCallback(() => {
    if (
      lenis.slideindex === -1 ||
      cubeRotationActive ||
      !lenis.isStopped ||
      scrollTweenActive ||
      gsap.getById('scrollTween') ||
      gsap.getById('cubeTweenOnEnter')
    )
      return;

    const scrollY = isMobile ? cubeRef.current.offsetTop - 251 : 0;

    if (lenis.slideindex === 0) {
      setIsInit(false);
      setIsHolded(false);
      scrollTweenActive = true;
      gsap.to(window, {
        id: isMobile ? 'scrollTweenMobile' : 'scrollTween',
        duration: 1,
        scrollTo: scrollY,
        ease: 'power1.inOut',
        onComplete: () => {
          scrollTweenActive = false;
          if (isMobile) lenis.start();
        },
      });
    }
    cubeRotationActive = true;
    setTimeout(() => (cubeRotationActive = false), 1000);
    lenis.slideindex--;
    handleChangeSlide(lenis.slideindex);
  }, [handleChangeSlide, isMobile, lenis, setIsHolded, setIsInit]);

  const handleDown = useCallback(() => {
    if (
      !lenis.isStopped ||
      noScroll ||
      scrollTweenActive ||
      gsap.getById('scrollTweenOnEnter') ||
      gsap.getById('cubeTweenOnEnter')
    )
      return;

    if (lenis.slideindex === -1) {
      scrollTweenActive = true;
      // setCurrentFocusSlide(0);
      //lenis.slideindex++;
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
  }, [handleChangeSlide, lenis, noScroll]);

  // Scroll observer init hook
  useGSAP(
    () => {
      if (lenis) {
        lenis.slideindex = -1;
        lenis.stop();
        if (noScroll) return;

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
          Observer.getById('scroll-trigger-observe').disable();
          lenis.start();
        }
      }
    },
    { dependencies: [lenis, noScroll] }
  );

  // TODO: fix on mobile
  useEffect(() => {
    // Remove observer if exists
    if (Observer.getById('scroll-trigger-observe') && lenis) {
      Observer.getById('scroll-trigger-observe').kill();

      const observer = ScrollTrigger.observe({
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

      if (currentFocusSlide > -1 && currentFocusSlide < 3) {
        gsap.set(window, {
          // duration: 1,
          scrollTo: cubeRef.current,
          // ease: 'power3.inOut',
        });
      }

      if (currentFocusSlide > -1) return;

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
      <AllWorks />
      <Follow />
      <Footer />
      {!isLoaded && <Loader medialist={medialist} />}
    </main>
  );
}
