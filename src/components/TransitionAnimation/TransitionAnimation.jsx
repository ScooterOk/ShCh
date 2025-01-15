import { mainContext } from '@/providers/MainProvider';
import React, { useContext, useEffect, useRef } from 'react';

import styles from './TransitionAnimation.module.scss';
import gsap from 'gsap';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const TransitionAnimation = () => {
  const { isTransition, setIsLoaded } = useContext(mainContext);
  const backgroundRef = useRef();
  const router = useRouter();

  useEffect(() => {
    if (isTransition) {
      const row0 = backgroundRef.current.querySelectorAll(
        '[data-row="0"] > div'
      );
      const row1 = backgroundRef.current.querySelectorAll(
        '[data-row="1"] > div'
      );
      const row2 = backgroundRef.current.querySelectorAll(
        '[data-row="2"] > div'
      );
      const row3 = backgroundRef.current.querySelectorAll(
        '[data-row="3"] > div'
      );

      gsap
        .timeline({
          onComplete: () => {
            router.push(isTransition?.href);
          },
        })
        .fromTo(
          row3,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.inOut',
          }
        )
        .fromTo(
          row2,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.inOut',
          },
          '-=0.85'
        )
        .fromTo(
          row1,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.inOut',
          },
          '-=0.85'
        )
        .fromTo(
          row0,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.inOut',
          },
          '-=0.85'
        );
    }
  }, [isTransition, router, setIsLoaded]);

  if (!isTransition) return null;

  return (
    <div
      ref={backgroundRef}
      className={clsx(styles.background, styles[isTransition?.theme])}
    >
      <div data-row="0" className={styles.background__row}>
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={`row-0-item-${i}`} />
        ))}
      </div>
      <div data-row="1" className={styles.background__row}>
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={`row-1-item-${i}`} />
        ))}
      </div>
      <div data-row="2" className={styles.background__row}>
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={`row-2-item-${i}`} />
        ))}
      </div>
      <div data-row="3" className={styles.background__row}>
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={`row-3-item-${i}`} />
        ))}
      </div>
    </div>
  );
};

export default TransitionAnimation;
