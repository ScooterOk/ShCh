'use client';
import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  '/models/all_works.gltf',
  '/models/lets.gltf',
  '/video/audio_hover.mp3',
];

const About = () => {
  const mainContainerRef = useRef();
  const footer = useRef();
  const titleAction = useRef(null);

  const [action, setAction] = useState(null);

  // useEffect(() => {
  //   gsap.set(titleAction.current, { visibility: 'hidden' });
  // }, []);

  const {
    isLoaded,
    setCurrentDescriptionSlide,
    resetMainProviderData,
    loadedVideos,
  } = useContext(mainContext);

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
      if (isLoaded && lenis && action) {
        lenis.start();
        gsap
          .timeline({
            //   onComplete: () => setNoScroll(false),
            id: 'hero-title-init',
          })
          .to(action, {
            time: 0.5,
            duration: 1,
            ease: 'power3.inOut',
          })
          .to(action, {
            time: 1.5,
            duration: 1,
            ease: 'power3.Out',
          });
      }
    },
    { dependencies: [isLoaded, lenis, action] }
  );

  return (
    <main ref={mainContainerRef} className={styles.works}>
      <div className={styles.title}>
        <div ref={titleAction} className={styles.title__canvas}>
          <Canvas
            camera={{ position: [0, 0, 1], orthographic: true }}
            gl={{ stencil: true }}
          >
            <Suspense fallback={null}>
              {loadedVideos?.['/models/all_works.gltf'] && (
                <WorksTitle action={action} setAction={setAction} />
              )}
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
