import React, { Suspense, useRef } from 'react';

import styles from './Footer.module.scss';
import Date from './Date';
import FooterTitle from './Title';
import { Canvas } from '@react-three/fiber';
import Links from './Links';
import Copyright from './Copyright';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Footer = () => {
  const container = useRef();

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
        `.${styles.links}`,
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
    <div className={styles.footer} ref={container}>
      <Date />
      <div className={styles.title}>
        <Canvas camera={{ position: [0, 0, 1], orthographic: true }}>
          <Suspense fallback={null}>
            <FooterTitle container={container.current} />
          </Suspense>
        </Canvas>
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
