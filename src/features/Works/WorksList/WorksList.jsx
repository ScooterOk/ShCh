import React, { useContext, useState } from 'react';
import gsap from 'gsap';

import { worksListData } from '../data';
import { handleHoverSound } from '@/services';

import styles from './WorksList.module.scss';
import { useGSAP } from '@gsap/react';
import { mainContext } from '@/providers/MainProvider';
import Link from 'next/link';
import clsx from 'clsx';

const WorksList = () => {
  const [isHoverActive, setIsHoverActive] = useState(false);
  const { isLoaded, setIsNavigationReady } = useContext(mainContext);

  useGSAP(
    () => {
      if (isLoaded) {
        const mainTimeline = gsap.timeline({
          delay: 0.7,
          onComplete: () => {
            setIsHoverActive(true);
            setIsNavigationReady(true);
          },
        });
        const worksList = document.querySelectorAll(`.${styles.works__item}`);
        const tlItems = [];

        worksList.forEach((item) => {
          const tl = gsap.timeline();
          const name = item.querySelectorAll(
            `.${styles.name} [data-animation]`
          );
          const tags = item.querySelectorAll(
            `.${styles.tags} [data-animation]`
          );
          const media = item.querySelectorAll(
            `.${styles.works__item_gallery} img, .${styles.works__item_gallery} video`
          );

          tl.from(
            item.querySelector(`.${styles.line}`),
            {
              scaleX: 0,
              duration: 1,
            },
            'start'
          )
            .from(
              name,
              {
                duration: 0.01,
                opacity: 0,
                stagger: {
                  amount: 0.5,
                  grid: 'auto',
                  from: 'random',
                },
              },
              '<+=0.2'
            )
            .from(
              tags,
              {
                duration: 0.01,
                opacity: 0,
                stagger: {
                  amount: 0.5,
                  grid: 'auto',
                  from: 'random',
                },
              },
              '<+=0.2'
            )
            .to(
              media,
              {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1,
                stagger: 0.1,
              },
              'start'
            );
          tlItems.push(tl);
        });

        tlItems.forEach((item) => mainTimeline.add(item, '<+=0.25'));

        const words = document.querySelectorAll(
          `.${styles.hero} [data-animation]`
        );

        gsap.timeline({ delay: 1 }).from(words, {
          duration: 0.01,
          opacity: 0,
          stagger: {
            amount: 0.5,
            grid: 'auto',
            from: 'random',
          },
        });
      }
    },
    { dependencies: [isLoaded] }
  );

  const handleHover = (e) => {
    if (!isHoverActive) return;
    const currentTargets = e.currentTarget.querySelectorAll('[data-animation]');

    handleHoverSound();
    gsap
      .timeline()
      .to(currentTargets, {
        duration: 0.1,
        opacity: 0,
        stagger: {
          amount: 0.25,
          grid: 'auto',
          from: 'random',
        },
      })
      .to(currentTargets, {
        duration: 0.01,
        opacity: 1,
        stagger: {
          amount: 0.25,
          grid: 'auto',
          from: 'random',
        },
      });
  };

  return (
    <div className={clsx(styles.works, !isHoverActive && styles.disabled)}>
      {worksListData.map((item) => (
        <div
          key={`allworks-item-${item.id}`}
          className={styles.works__item}
          onMouseEnter={handleHover}
        >
          <Link href={`/works/${item.id}`} className={styles.link}>
            <div className={styles.works__item_info}>
              <div className={styles.line} />
              <div className={styles.name}>
                {Array.from(item.name).map((l, i) => (
                  <span data-animation key={`name-${l}-${i}-${l}`}>
                    {l}
                  </span>
                ))}
              </div>
              <ul className={styles.tags}>
                {item.tags.map((tag) => (
                  <li key={`allworks-item-tag-${tag}`} className={styles.tag}>
                    {Array.from(tag).map((l, i) => (
                      <span data-animation key={`name-${l}-${i}-${l}`}>
                        {l}
                      </span>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.works__item_gallery}>
              {item.media.map((media) => {
                const ext = media.split('.').pop();
                if (ext === 'mp4') {
                  return (
                    <video
                      key={`allworks-item-media-${media}`}
                      preload="auto"
                      muted
                      playsInline
                      autoPlay
                      loop
                    >
                      <source
                        src={`/img/allworks/${item.id}/${media}`}
                        type="video/mp4"
                      />
                    </video>
                  );
                }
                return (
                  // eslint-disable-next-line
                  <img
                    key={`allworks-item-media-${media}`}
                    src={`/img/allworks/${item.id}/${media}`}
                    alt={item.name}
                  />
                );
              })}
            </div>
            <div className={styles.works__item_right} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default WorksList;
