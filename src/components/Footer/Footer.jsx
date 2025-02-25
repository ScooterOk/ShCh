import React, { Suspense, useContext, useRef } from 'react';

import styles from './Footer.module.scss';
import Date from './Date';
import FooterTitle from './Title';
import { Canvas } from '@react-three/fiber';
import Links from './Links';
import Copyright from './Copyright';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FooterTitleMobile from './TitleMobile';
import useMobile from '@/hooks/useMobile';
import clsx from 'clsx';
import { mainContext } from '@/providers/MainProvider';

const Footer = ({ className, titleColor }) => {
  const container = useRef();

  const { loadedVideos } = useContext(mainContext);

  const { isMobile } = useMobile();

  useGSAP(() => {
    const words = container.current.querySelectorAll('[data-animation]');

    gsap
      .timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
          end: 'bottom bottom',
        },
      })
      .fromTo(
        `.${styles.links__link}`,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power3.inOut',
        }
      )
      .from(words, {
        duration: 0.01,
        opacity: 0,
        stagger: {
          amount: 1,
          grid: 'auto',
          from: 'random',
        },
      });
  });

  return (
    <div
      className={clsx(styles.footer, className && className)}
      ref={container}
    >
      <Date />
      <div className={styles.title}>
        <div className={styles.title__canvas}>
          <Canvas camera={{ position: [0, 0, 1], orthographic: true }}>
            <Suspense fallback={null}>
              <group scale={isMobile ? 0 : 1}>
                {loadedVideos?.['/models/lets.gltf'] && (
                  <FooterTitle
                    container={container.current}
                    titleColor={titleColor}
                  />
                )}
              </group>
              <group scale={isMobile ? 1 : 0}>
                {loadedVideos?.['/models/lets.gltf'] && (
                  <FooterTitleMobile
                    container={container.current}
                    titleColor={titleColor}
                  />
                )}
              </group>
            </Suspense>
          </Canvas>
        </div>

        <div className={styles.title__description}>
          {Array.from('extraordinary').map((l, i) => (
            <span data-animation key={`name-${l}-${i}-${l}`}>
              {l}
            </span>
          ))}
          <br />
          {Array.from('digital').map((l, i) => (
            <span data-animation key={`name-${l}-${i}-${l}`}>
              {l}
            </span>
          ))}
          <br />
          {Array.from('experience').map((l, i) => (
            <span data-animation key={`name-${l}-${i}-${l}`}>
              {l}
            </span>
          ))}
        </div>
      </div>
      <Links />
      <Copyright />
    </div>
  );
};

export default Footer;
