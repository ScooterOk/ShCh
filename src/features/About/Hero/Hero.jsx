import React, { Suspense, useContext, useEffect, useRef } from 'react';
import styles from './Hero.module.scss';
import { Canvas } from '@react-three/fiber';
import AboutHeroTitle from '@/components/About/AboutHeroTitle';
import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = () => {
  const { isLoaded, loadedVideos } = useContext(mainContext);
  const videoRef = useRef();
  const canvas = useRef();

  //   useEffect(() => {
  //     if (isLoaded) videoRef.current.play();
  //   }, [isLoaded]);

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
          {loadedVideos?.['/video/hero_head_video_full.mp4'] && (
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
                src={loadedVideos?.['/video/hero_head_video_full.mp4']}
                type="video/mp4"
              />
            </video>
          )}
        </div>
        <div className={styles.title__name}>
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
              <AboutHeroTitle />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Hero;
