'use client';
import React, { Suspense, useContext, useEffect, useRef } from 'react';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { useGSAP } from '@gsap/react';
import { Canvas } from '@react-three/fiber';

import Footer from '@/components/Footer/Footer';
import Loader from '@/components/Loader/Loader';
import WorksTitle from '@/components/Works/WorksTitle';

import WorksList from '@/features/Works/WorksList/WorksList';

import { mainContext } from '@/providers/MainProvider';

import styles from './page.module.scss';

const videolist = [
  '/video/hero_head_video_full.mp4',
  '/video/_CUBE_01_full.mp4',
  '/video/_CUBE_02_full.mp4',
  '/video/_CUBE_03_full.mp4',
  '/video/CUBE_04_loop.mp4',
  '/video/audio_hover.mp3',
];

const About = () => {
  const mainContainerRef = useRef();
  const footer = useRef();
  const titleAction = useRef(null);

  const { isLoaded, setCurrentDescriptionSlide, resetMainProviderData } =
    useContext(mainContext);

  const lenis = useLenis();

  useEffect(() => {
    return () => resetMainProviderData();
  }, [resetMainProviderData, setCurrentDescriptionSlide]);

  // Scrollbar trigger init
  useGSAP(
    () => {
      if (lenis) {
        lenis.stop();
        ScrollTrigger.create({
          id: 'scroll-bar-trigger',
          trigger: footer.current,
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

  useGSAP(
    () => {
      if (isLoaded && lenis) {
        lenis.start();
        if (titleAction.current) {
          gsap
            .timeline({
              //   onComplete: () => setNoScroll(false),
              id: 'hero-title-init',
            })
            .to(titleAction.current, {
              time: 0.5,
              duration: 1,
              ease: 'power3.inOut',
            })
            .to(titleAction.current, {
              time: 1.5,
              duration: 1,
              ease: 'power3.Out',
            });
        }
      }
    },
    { dependencies: [isLoaded, lenis] }
  );

  return (
    <main ref={mainContainerRef} className={styles.works}>
      <div className={styles.title}>
        <div className={styles.title__canvas}>
          <Canvas
            camera={{ position: [0, 0, 1], orthographic: true }}
            gl={{ stencil: true }}
          >
            <Suspense fallback={null}>
              <WorksTitle action={titleAction} />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <WorksList />
      <div ref={footer}>
        <Footer className={styles.footer} titleColor={'#9b9b88'} />
      </div>

      {!isLoaded && <Loader videolist={videolist} />}
    </main>
  );
};

export default About;
