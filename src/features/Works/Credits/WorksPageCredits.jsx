import React, { useContext, useRef } from 'react';
import styles from './WorksPageCredits.module.scss';
import { useGSAP } from '@gsap/react';
import { mainContext } from '@/providers/MainProvider';
import gsap from 'gsap';

const WorksPageCredits = ({ credits: list }) => {
  const { isLoaded } = useContext(mainContext);

  const container = useRef();
  const line = useRef();

  useGSAP(
    () => {
      if (isLoaded) {
        const words = container.current.querySelectorAll('[data-animation]');

        gsap
          .timeline({
            scrollTrigger: {
              trigger: container.current,
              start: '-=10% 80%',
              end: 'bottom bottom',
            },
          })
          .from(line.current, {
            scaleX: 0,
            duration: 1.5,
            ease: 'power4.inOut',
          })
          .from(words, {
            duration: 0.01,
            opacity: 0,
            stagger: {
              amount: 1,
              grid: 'auto',
              from: 'random',
            },
          });
      }
    },
    { dependencies: [isLoaded] }
  );

  return (
    <div className={styles.credits} ref={container}>
      <div className={styles.line} ref={line} />
      <h2 className={styles.credits__title}>
        {Array.from('Credits:').map((l, i) => (
          <span data-animation key={`name-${l}-${i}-${l}`}>
            {l}
          </span>
        ))}
      </h2>
      <ul className={styles.credits__list}>
        {list?.map((item) => (
          <li key={`credit-${item.id}`}>
            <p>
              {Array.from(item.name).map((l, i) => (
                <span data-animation key={`name-${l}-${i}-${l}`}>
                  {l}
                </span>
              ))}
            </p>
            <p>
              {Array.from(item.title).map((l, i) => (
                <span data-animation key={`name-${l}-${i}-${l}`}>
                  {l}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorksPageCredits;
