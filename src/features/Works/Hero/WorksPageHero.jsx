import IconButton from '@/components/IconButton/IconButton';
import { IconArrowLeft } from '@/components/icons';
import React, { useContext, useRef } from 'react';

import styles from './WorksPageHero.module.scss';
import { useGSAP } from '@gsap/react';
import { mainContext } from '@/providers/MainProvider';
import gsap from 'gsap';

const WorksPageHero = ({ title, description, tags }) => {
  const { isLoaded, setIsNavigationReady } = useContext(mainContext);

  const container = useRef();
  const buttonRef = useRef();
  const titleRef = useRef();
  const lineRef = useRef();

  useGSAP(
    () => {
      if (isLoaded) {
        const clipPathArray = gsap.utils.toArray([
          buttonRef.current,
          titleRef.current,
          lineRef.current,
        ]);

        const words = container.current.querySelectorAll('[data-animation]');

        gsap
          .timeline()
          .fromTo(
            clipPathArray,
            { clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0px 50%)' },
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0px 100%)',
              duration: 1.5,
              ease: 'power4.inOut',
            }
          )
          .add(() => setIsNavigationReady(true))
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
    <div className={styles.hero} ref={container}>
      <IconButton href={'/works'} ref={buttonRef} className={styles.hero__back}>
        <IconArrowLeft />
      </IconButton>
      <div className={styles.info}>
        {title && (
          <div className={styles.info__title} ref={titleRef}>
            <h1>
              {Array.from(title).map((l, i) => (
                <span data-animation key={`name-${l}-${i}-${l}`}>
                  {l}
                </span>
              ))}
            </h1>
          </div>
        )}
        {description && (
          <div className={styles.info__description}>
            {Array.from(description).map((l, i) => (
              <span data-animation key={`name-${l}-${i}-${l}`}>
                {l}
              </span>
            ))}
          </div>
        )}
        {tags?.length && (
          <div className={styles.info__tags}>
            <div className={styles.info__tags_line} ref={lineRef} />
            <ul>
              {tags?.map((tag) => (
                <li key={`tag-${tag}`}>
                  {Array.from(`#${tag}`).map((l, i) => (
                    <span data-animation key={`name-${l}-${i}-${l}`}>
                      {l}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorksPageHero;
