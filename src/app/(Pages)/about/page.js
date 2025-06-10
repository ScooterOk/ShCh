'use client';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { mainContext } from '@/providers/MainProvider';
import Loader from '@/components/Loader/Loader';
import Hero from '@/features/About/Hero/Hero';
import Description from '@/features/About/Description/Description';

import Recognition from '@/features/About/Recognition/Recognition';
import Footer from '@/components/Footer/Footer';

import styles from './page.module.scss';
import DescriptionCube from '@/features/About/DescriptionCube/DescriptionCube';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

import { useLenis } from 'lenis/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useMobile from '@/hooks/useMobile';

const medialist = [
  '/video/hero_head_video_full.mp4',
  '/video/CUBE_01_full.mp4',
  '/video/CUBE_02_full.mp4',
  // '/video/CUBE_03_full.mp4',
  '/video/CUBE_04_full.mp4',
  '/models/about_digital_art_director.gltf',
  '/models/about_digital_art_director_mob.gltf',
  '/models/10.gltf',
  '/models/recognition.gltf',
  '/models/about_creativence.gltf',
  '/models/about_innovis.gltf',
  '/video/audio_hover.mp3',
  '/models/lets.gltf',
];

let cubeRotationActive = false;
let scrollTweenActive = false;

const About = () => {
  const cubeRef = useRef();
  const mainContainerRef = useRef();
  const scrollBarTrigger = useRef();

  const {
    isLoaded,
    noScroll,
    setCurrentDescriptionSlide,
    setIsInit,
    setIsHolded,
    resetMainProviderData,
  } = useContext(mainContext);
  const lenis = useLenis();

  const { isMobile } = useMobile();

  useEffect(() => {
    return () => resetMainProviderData();
  }, [resetMainProviderData, setCurrentDescriptionSlide]);

  const handleChangeSlide = useCallback(
    (index) => {
      setCurrentDescriptionSlide(index);
    },
    [setCurrentDescriptionSlide]
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

    const scrollY = cubeRef.current.offsetTop - 251;

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
          lenis.start();
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

  // Scrollbar trigger init
  useGSAP(
    () => {
      if (lenis) {
        ScrollTrigger.create({
          id: 'scroll-bar-trigger',
          trigger: scrollBarTrigger.current,
          start: 'top 50%',
          end: 'bottom 50%',
          toggleClass: {
            targets: document.querySelector('[data-id="scrollbar"]'),
            className: 'light',
          },
        });
      }
    },
    { dependencies: [lenis] }
  );

  // Scroll observer init hook
  useGSAP(
    () => {
      if (lenis) {
        Observer.getById('scroll-trigger-observe')?.kill();
        lenis.slideindex = -1;
        // let scrollTweenActive = false;
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

        Observer.getById('scroll-trigger-observe').disable();
        lenis.start();
      }
    },
    { dependencies: [lenis, noScroll] }
  );

  return (
    <main ref={mainContainerRef} className={styles.about}>
      <div ref={scrollBarTrigger}>
        <Hero />
        <Description />
        <div ref={cubeRef}>
          <DescriptionCube />
        </div>
        <Recognition />
      </div>
      <Footer className={styles.footer} />
      {!isLoaded && <Loader medialist={medialist} theme="dark" />}
    </main>
  );
};

export default About;
