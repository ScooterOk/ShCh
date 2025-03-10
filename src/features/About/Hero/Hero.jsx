import React, { Suspense, useContext, useRef } from 'react';
import styles from './Hero.module.scss';
import { Canvas } from '@react-three/fiber';
import AboutHeroTitle from '@/components/About/AboutHeroTitle';
import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useMobile from '@/hooks/useMobile';
import AboutHeroTitleMobile from '@/components/About/AboutHeroTitleMobile';

const Hero = () => {
  const { isLoaded, loadedMedia, setNoScroll, setIsNavigationReady } =
    useContext(mainContext);
  const videoRef = useRef();
  const canvas = useRef();

  const { isMobile } = useMobile();

  useGSAP(
    () => {
      if (isLoaded) {
        const words = document.querySelectorAll(
          `.${styles.hero} [data-animation]`
        );

        gsap
          .timeline({ delay: 1 })
          .add(() => videoRef.current.play())
          .from(words, {
            duration: 0.01,
            opacity: 0,
            stagger: {
              amount: 0.5,
              grid: 'auto',
              from: 'random',
            },
          })
          .add(() => {
            setNoScroll(false);
            setIsNavigationReady(true);
          });
      }
    },
    { dependencies: [isLoaded] }
  );

  return (
    <div className={styles.hero}>
      <div className={styles.open}>
        {Array.from('Open to work').map((l, i) => (
          <span data-animation key={`name-${l}-${i}-${l}`}>
            {l}
          </span>
        ))}
      </div>
      <div className={styles.title}>
        <div className={styles.title__video}>
          {loadedMedia?.['/video/hero_head_video_full.mp4'] && (
            <video
              ref={videoRef}
              width="680"
              height="680"
              preload="auto"
              muted
              playsInline
              loop
            >
              <source
                src={loadedMedia?.['/video/hero_head_video_full.mp4']}
                type="video/mp4"
              />
            </video>
          )}
        </div>
        <div className={styles.title__name}>
          <div className={styles.title__name_text}>
            <p>
              {Array.from('Serhii Churilov').map((l, i) => (
                <span data-animation key={`name-${l}-${i}-${l}`}>
                  {l}
                </span>
              ))}
            </p>
            <p>
              {Array.from('is a freelance').map((l, i) => (
                <span data-animation key={`name-${l}-${i}-${l}`}>
                  {l}
                </span>
              ))}
            </p>
          </div>
          <div className={styles.open}>
            {Array.from('Open to work').map((l, i) => (
              <span data-animation key={`name-${l}-${i}-${l}`}>
                {l}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.title__director}>
          {Array.from('Director &').map((l, i) => (
            <span data-animation key={`name-${l}-${i}-${l}`}>
              {l}
            </span>
          ))}
        </div>
        <div className={styles.title__canvas}>
          <Canvas
            ref={canvas}
            camera={{ position: [0, 0, 1], orthographic: true }}
            gl={{ stencil: true }}
          >
            <Suspense fallback={null}>
              <group scale={isMobile ? 0 : 1}>
                {loadedMedia?.['/models/about_digital_art_director.gltf'] && (
                  <AboutHeroTitle />
                )}
              </group>
              <group scale={isMobile ? 1 : 0}>
                {loadedMedia?.[
                  '/models/about_digital_art_director_mob.gltf'
                ] && <AboutHeroTitleMobile />}
              </group>
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Hero;
