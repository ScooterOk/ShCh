import React, { Suspense, useRef } from 'react';

import HomeFollowTitle from '@/components/(Home)/HomeFollowTitle';
import { Canvas } from '@react-three/fiber';

import Backgrounds from '@/components/(Home)/Follow/Backgrounds';
import HoverLink from '@/components/HoverLink';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './Follow.module.scss';

const Follow = () => {
  const container = useRef();
  const list = useRef();

  useGSAP(() => {
    // Scroll Bar Color Trigger
    ScrollTrigger.create({
      trigger: container.current,
      start: 'top 50%',
      end: 'bottom 50%',
      toggleClass: {
        targets: document.querySelector('[data-id="scrollbar"]'),
        className: 'light',
      },
    });

    const words = container.current.querySelectorAll('[data-animation]');

    gsap
      .timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 50%',
          end: 'bottom bottom',
        },
      })
      .from(list.current, {
        scaleY: 0,
        duration: 1,
        ease: 'power3.inOut',
      })
      .fromTo(
        list.current.querySelectorAll('a'),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power3.inOut',
        }
      )
      .add(() => {
        document.querySelector(`.${styles.silver}`).play();
        document.querySelector(`.${styles.robo}`).play();
        document.querySelector(`.${styles.astranaut}`).play();
        document.querySelector(`.${styles.venera}`).play();
      })
      .from(
        words,
        {
          duration: 0.01,
          opacity: 0,
          stagger: {
            amount: 0.5,
            grid: 'auto',
            from: 'random',
          },
        },
        'clip'
      )
      .to(
        gsap.utils.toArray([
          `.${styles.silver}`,
          `.${styles.robo}`,
          `.${styles.astranaut}`,
          `.${styles.venera}`,
        ]),
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0px 100%)',
          duration: 1.5,
          ease: 'power4.inOut',
        },
        'clip'
      );
  });

  return (
    <div className={styles.follow} ref={container}>
      <Backgrounds styles={styles} container={container.current} />
      <div className={styles.title}>
        <Canvas
          camera={{ position: [0, 0, 1], orthographic: true }}
          gl={{ stencil: true }}
        >
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <HomeFollowTitle container={container.current} />
          </Suspense>
        </Canvas>
        <div className={styles.title__description}>
          {Array.from(
            'and check my work in progress, explorations, experimentations'
          ).map((l, i) => (
            <span data-animation key={`name-${l}-${i}-${l}`}>
              {l}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.list} ref={list}>
        <HoverLink href="/" Component={'a'} line={false}>
          Instagram
        </HoverLink>
        <HoverLink href="/" Component={'a'} line={false}>
          LinkedIn
        </HoverLink>
      </div>
    </div>
  );
};

export default Follow;
