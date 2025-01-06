import { useProgress } from '@react-three/drei';
import React, { useContext, useMemo, useRef, useState } from 'react';

import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useVideo from '@/hooks/useVideo';

import styles from './Loader.module.scss';
import SoundButton from '../SoundButton/SoundButton';
import { mainContext } from '@/providers/MainProvider';

let progressCount = { value: 0 };

const Loader = ({ videolist: list }) => {
  const { setIsLoaded } = useContext(mainContext);
  const { progress: modelsProgress } = useProgress();
  const { progress: videoProgress } = useVideo({
    list,
  });

  const [count, setCount] = useState(0);

  const container = useRef(null);

  const progress = useMemo(
    () => (modelsProgress + videoProgress) / 2,
    [modelsProgress, videoProgress]
  );

  // Progress count animation
  useGSAP(
    () => {
      gsap.to(progressCount, {
        duration: 1,
        value: progress,
        overwrite: true,
        onUpdate: () => setCount(Math.round(progressCount.value)),
        onComplete: () => {
          if (videoProgress === 100) {
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
        duration: 1,
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
    <div ref={container} className={styles.loader}>
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
          <SoundButton color="#000000" transparent />
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
