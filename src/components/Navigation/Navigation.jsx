'use client';
import React, { useContext, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { mainContext } from '@/providers/MainProvider';
import Music from '@/components/Music';

import styles from './Navigation.module.scss';
import TransitionLink from '../TransitionLink/TransitionLink';
import Link from 'next/link';

const Navigation = () => {
  const { isNavigationReady, setNoScroll } = useContext(mainContext);
  const rootRef = useRef();

  useGSAP(
    () => {
      if (isNavigationReady) {
        gsap
          .timeline()
          .from(rootRef.current, {
            duration: 1,
            autoAlpha: 0,
            y: 100,
            ease: 'power3.out',
          })
          .from(rootRef.current.querySelector('canvas'), {
            duration: 1,
            opacity: 0,
          })
          .set(rootRef.current, { clearProps: 'transform' })
          .add(() => setNoScroll(false));
      }
    },
    { dependencies: [isNavigationReady] }
  );

  const onMouseEnter = (e) => {
    const currentTargets = e.currentTarget.querySelectorAll('span');
    if (e.type === 'mouseenter') {
      gsap
        .timeline()
        .to(currentTargets, {
          duration: 0.1,
          opacity: 0,
          stagger: {
            amount: 0.3,
            grid: 'auto',
            from: 'random',
          },
        })
        .to(currentTargets, {
          duration: 0.01,
          opacity: 1,
          stagger: {
            amount: 0.3,
            grid: 'auto',
            from: 'random',
          },
        });
    }
  };

  return (
    <div ref={rootRef} className={styles.navigation}>
      {/* TODO: Turn on music */}
      {/* <Music /> */}
      <ul>
        <li>
          <TransitionLink
            className={styles.active}
            href={'/'}
            theme="light"
            onMouseEnter={onMouseEnter}
          >
            {Array.from('Home').map((l, i) => (
              <span data-animation key={`name-${l}-${i}-${l}`}>
                {l}
              </span>
            ))}
          </TransitionLink>
        </li>
        <li>
          <TransitionLink href={'/works'} onMouseEnter={onMouseEnter}>
            {Array.from('Work').map((l, i) => (
              <span data-animation key={`name-${l}-${i}-${l}`}>
                {l}
              </span>
            ))}
          </TransitionLink>
        </li>
        <li>
          <TransitionLink
            href={'/about'}
            theme="dark"
            onMouseEnter={onMouseEnter}
          >
            {Array.from('About').map((l, i) => (
              <span data-animation key={`name-${l}-${i}-${l}`}>
                {l}
              </span>
            ))}
          </TransitionLink>
        </li>
        <li>
          <Link href={'/'} onMouseEnter={onMouseEnter}>
            {Array.from('Contact').map((l, i) => (
              <span data-animation key={`name-${l}-${i}-${l}`}>
                {l}
              </span>
            ))}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
