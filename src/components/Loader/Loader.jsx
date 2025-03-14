import React, { useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';

import SoundButton from '../SoundButton/SoundButton';
import { mainContext } from '@/providers/MainProvider';

import colors from '@/configs/colors';
import useMedia from '@/hooks/useMedia';

import styles from './Loader.module.scss';

const { bg, black } = colors;

let progressCount = { value: 0 };

const Loader = ({ medialist: list, theme = 'light' }) => {
  const { setIsLoaded } = useContext(mainContext);
  // const { progress: modelsProgress } = useProgress();
  const { progress, isMediaListReady } = useMedia({
    list,
  });

  const [count, setCount] = useState(0);

  const container = useRef(null);

  // const progress = useMemo(
  //   () => (modelsProgress + mediaProgress) / 2,
  //   [modelsProgress, mediaProgress]
  // );

  useEffect(() => {
    if (isMediaListReady) setIsLoaded(true);
  }, [setIsLoaded]);

  // Progress count animation
  useGSAP(
    () => {
      gsap.to(progressCount, {
        duration: 1,
        value: progress,
        overwrite: true,
        onUpdate: () => setCount(Math.round(progressCount.value)),
        onComplete: () => {
          if (progress >= 100) {
            gsap.to(
              [
                document.querySelectorAll(`.${styles.name} span`),
                document.querySelectorAll(`.${styles.sound} span`),
              ],
              {
                duration: 0.01,
                opacity: 0,
                stagger: {
                  each: 0.05,
                  grid: 'auto',
                  from: 'random',
                },
                onComplete: () => {
                  gsap.set(`.${styles.count}`, {
                    opacity: 0,
                  });
                  setIsLoaded(true);
                },
              }
            );
            gsap.to(`.${styles.sound__wave}`, {
              duration: 1,
              opacity: 0,
            });
            gsap.set(`.${styles.image}`, {
              opacity: 0,
              delay: 0.75,
            });
          }
        },
      });
    },
    { scope: container, dependencies: [progress] }
  );

  // Init animation
  useGSAP(
    () => {
      gsap.set(`.${styles.count}`, { display: 'block' });
      gsap.to(
        [
          document.querySelectorAll(`.${styles.name} span`),
          document.querySelectorAll(`.${styles.sound} span`),
        ],
        {
          duration: 0.01,
          opacity: 1,
          stagger: {
            each: 0.05,
            grid: 'auto',
            from: 'random',
          },
        }
      );
      gsap.to(`.${styles.image}`, {
        duration: theme === 'light' ? 1 : 0.1,
        scale: 1,
        ease: 'power3.inOut',
        onComplete: () =>
          gsap.set(`.${styles.image} img`, { display: 'block' }),
      });
      gsap.to(`.${styles.sound__wave}`, {
        delay: 0.5,
        duration: 1,
        opacity: 1,
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className={clsx(styles.loader, styles[theme])}>
      <div className={styles.grid}>
        <div />
        <div className={styles.name}>
          <p>
            {Array.from('Serhii Churilov').map((letter, index) => (
              <span key={`name-${letter}-${index}`}>{letter}</span>
            ))}
          </p>
          <p>
            {Array.from('Portfolio').map((letter, index) => (
              <span key={`portfolio-${letter}-${index}`}>{letter}</span>
            ))}
          </p>
        </div>
        <div className={styles.image}>
          <Image
            src={'/img/Preloader_00.gif'}
            width={80}
            height={80}
            priority={true}
            loading="eager"
            alt="Loading..."
          />
        </div>
        <div className={styles.count}>{count}%</div>
      </div>
      <div className={styles.sound}>
        <p>
          {Array.from('Click to enable').map((letter, index) => (
            <span key={`name-${letter}-${index}`}>{letter}</span>
          ))}
        </p>
        <p className={styles.sound__wave}>
          <SoundButton color={theme === 'light' ? black : bg} transparent />
        </p>
        <p>
          {Array.from('sound').map((letter, index) => (
            <span key={`name-${letter}-${index}`}>{letter}</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Loader;
