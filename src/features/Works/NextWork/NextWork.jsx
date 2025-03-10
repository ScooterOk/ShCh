'use client';
import React, { Suspense, useContext, useRef, useState } from 'react';
import styles from './NextWork.module.scss';
import { Canvas } from '@react-three/fiber';

import NextWorkTitle from '@/components/Works/NextWorkTitle';
import { mainContext } from '@/providers/MainProvider';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const year = new Date().getFullYear();

const NextWork = () => {
  const [action, setAction] = useState();
  const { loadedMedia, isLoaded } = useContext(mainContext);

  const container = useRef();
  const nextVideoRef = useRef();

  useGSAP(
    () => {
      if (isLoaded && action) {
        ScrollTrigger.create({
          id: 'scroll-bar-trigger',
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
            id: 'next-work-title-init',
            scrollTrigger: {
              trigger: container.current,
              start: 'top 80%',
              end: 'bottom bottom',
            },
          })
          .fromTo(
            nextVideoRef.current,
            { clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0px 50%)' },
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0px 100%)',
              duration: 1,
              ease: 'power4.inOut',
            },
            'start'
          )
          .to(
            action,
            {
              time: 0.5,
              duration: 1,
              ease: 'power3.inOut',
            },
            'start'
          )
          .to(
            action,
            {
              time: 1.5,
              duration: 1,
              ease: 'power3.Out',
            },
            'end'
          )
          .from(
            words,
            {
              duration: 0.01,
              opacity: 0,
              stagger: {
                amount: 1,
                grid: 'auto',
                from: 'random',
              },
            },
            'end'
          );
      }
    },
    { dependencies: [isLoaded, action] }
  );

  return (
    <div className={styles.next} ref={container}>
      <div className={styles.wrapper}>
        <div className={styles.next__title}>
          <Link href="">
            <Canvas
              camera={{ position: [0, 0, 1], orthographic: true }}
              //   gl={{ stencil: true }}
            >
              <Suspense fallback={null}>
                {loadedMedia?.['/models/next_work.gltf'] && (
                  <NextWorkTitle
                    container={container.current}
                    setAction={setAction}
                  />
                )}
              </Suspense>
            </Canvas>
          </Link>
        </div>
        <div className={styles.next__video}>
          <video
            preload="auto"
            muted
            loop
            playsInline
            autoPlay
            ref={nextVideoRef}
          >
            <source
              src={'/video/HEAVENSAKE/bg_preview_heavenSAKE.mp4'}
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <div className={styles.next__copyright}>
        {Array.from(`©${year} Serhii Churilov`).map((l, i) => (
          <span data-animation key={`name-${l}-${i}-${l}`}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NextWork;
