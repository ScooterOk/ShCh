'use client';
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
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
import { Canvas } from '@react-three/fiber';
import WorksTitle from '@/components/Works/WorksTitle';

const videolist = [
  '/video/hero_head_video_full.mp4',
  '/video/_CUBE_01_full.mp4',
  '/video/_CUBE_02_full.mp4',
  '/video/_CUBE_03_full.mp4',
  '/video/CUBE_04_loop.mp4',
  '/video/audio_hover.mp3',
];

let cubeRotationActive = false;
let scrollTweenActive = false;

const About = () => {
  const cubeRef = useRef();
  const mainContainerRef = useRef();
  const scrollBarTrigger = useRef();

  const titleAction = useRef(null);

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

  useGSAP(
    () => {
      if (isLoaded) {
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
    { dependencies: [isLoaded] }
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
      <Footer className={styles.footer} titleColor={'#9b9b88'} />
      {!isLoaded && <Loader videolist={videolist} />}
    </main>
  );
};

export default About;
