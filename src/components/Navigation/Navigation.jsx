'use client';
import React, { useContext, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { mainContext } from '@/providers/MainProvider';
import Music from '@/components/Music';

import styles from './Navigation.module.scss';
import TransitionLink from '../TransitionLink/TransitionLink';

import { usePathname } from 'next/navigation';
import routerConfig from '@/configs/router';
import clsx from 'clsx';

const Navigation = () => {
  const { isNavigationReady, setNoScroll } = useContext(mainContext);
  const rootRef = useRef();

  const pathname = usePathname();

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
      <Music />
      <ul>
        {Object.values(routerConfig).map((route) => (
          <li key={`navigation-${route.id}`}>
            <TransitionLink
              className={clsx(route.href === pathname && styles.active)}
              href={route.href}
              theme={route.theme}
              onMouseEnter={onMouseEnter}
            >
              {Array.from(route.title).map((l, i) => (
                <span data-animation key={`name-${l}-${i}-${l}`}>
                  {l}
                </span>
              ))}
            </TransitionLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
