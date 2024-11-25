import { useGLTF, useProgress } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';

import styles from './Loader.module.scss';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

let progressCount = { value: 0 };

const Loader = ({ setIsLoaded }) => {
  const { progress, item, total } = useProgress();

  const [count, setCount] = useState(0);

  const container = useRef(null);

  // useEffect(() => {
  //   console.log('ITEM', total, item);
  // }, [item, total]);

  useGSAP(
    () => {
      gsap.to(progressCount, {
        duration: 2,
        value: progress,
        onUpdate: () => {
          // console.log('progressCount.value', progressCount.value);

          setCount(Math.round(progressCount.value));
        },
        onComplete: () => {
          if (progress === 100) {
            gsap.to(document.querySelectorAll(`.${styles.name} span`), 0.5, {
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

  useGSAP(
    () => {
      // gsap.from("img", 2, { scale: 0 });
      // gsap.to("img", 2, { rotate: 360, repeat: -1, ease: "none" });
      gsap.set(`.${styles.count}`, { display: 'block' });
      gsap.to(document.querySelectorAll(`.${styles.name} span`), {
        duration: 0.5,
        opacity: 1,
        stagger: {
          each: 0.05,
          grid: 'auto',
          from: 'random',
        },
      });
      gsap.to(`.${styles.image}`, {
        duration: 1,
        scale: 1,
        ease: 'power3.inOut',
        onComplete: () =>
          gsap.set(`.${styles.image} img`, { display: 'block' }),
      });
    },
    { scope: container, dependencies: [] }
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
    </div>
  );
};

export default Loader;
