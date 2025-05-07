import React, { useCallback, useContext, useRef, useState } from 'react';

import clsx from 'clsx';
import gsap from 'gsap';

import certificates from '@/configs/certificates';

import styles from './Recognition.module.scss';
import { useMediaQuery } from 'usehooks-ts';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { handleHoverSound } from '@/services';
import { mainContext } from '@/providers/MainProvider';

const Gallery = ({ imagesListRef, lineRef }) => {
  const [activeList, setActiveList] = useState(certificates.map(() => false));

  const { isMuted } = useContext(mainContext);

  const listRef = useRef();

  const lenis = useLenis();

  const isMobile = useMediaQuery('(max-width: 576px)');

  useGSAP(
    () => {
      if (lenis) {
        const list = listRef.current.querySelectorAll('li[data-index]');
        list.forEach((item, index) => {
          const trigger = ScrollTrigger.getById(
            `mobile-gallery-trigger-${index}`
          );
          if (trigger) {
            if (isMobile) {
              trigger.enable();
            } else {
              trigger.disable();
            }
          } else {
            if (!isMobile) return;
            ScrollTrigger.create({
              id: `mobile-gallery-trigger-${index}`,
              trigger: item,
              start: 'top 50%',
              end: 'bottom 50%',
              disable: true,
              toggleClass: {
                targets: item,
                className: 'active',
              },
              onToggle: (self) => {
                const isEnter = self.isActive;
                const image = imagesListRef.current.querySelector(
                  `[data-index="${index}"]`
                );

                setActiveList((prev) => {
                  const list = [...prev];
                  list[index] = isEnter;
                  return list;
                });
                gsap.to(image, {
                  duration: 1,
                  clipPath: isEnter
                    ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0px 100%)'
                    : 'polygon(0px 50%, 100% 50%, 100% 50%, 0px 50%)',
                  ease: 'power2.inOut',
                  overwrite: true,
                });
              },
            });
          }
        });
      }
    },
    { dependencies: [lenis, isMobile] }
  );

  const handleHover = useCallback(
    (e) => {
      if (isMobile) return;
      const isEnter = e.type === 'pointerenter';
      const index = Number(e.currentTarget.dataset.index);
      const image = imagesListRef.current.querySelector(
        `[data-index="${index}"]`
      );

      // Play hover sound
      if (!isMuted) handleHoverSound();

      setActiveList((prev) => {
        const list = [...prev];
        list[index] = isEnter;
        return list;
      });
      gsap.to(image, {
        duration: 1,
        clipPath: isEnter
          ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0px 100%)'
          : 'polygon(0px 50%, 100% 50%, 100% 50%, 0px 50%)',
        ease: 'power2.inOut',
        overwrite: true,
      });

      if (isEnter) {
        const currentTargets = e.currentTarget.querySelectorAll('span');
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
    },
    [imagesListRef, isMobile]
  );

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__images} ref={imagesListRef}>
        {certificates.map((item, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={clsx(activeList[i] && styles.active)}
            src={`/img/certificates/${item.img}`}
            key={item.img}
            data-index={i}
            alt={item.name}
          />
        ))}
      </div>
      <div className={styles.gallery__list}>
        <div className={styles.gallery__list_title}>
          <div ref={lineRef} className={styles.line} />
          <p>
            {Array.from('Awwwards Winner & Jury').map((l, i) => (
              <span data-animation key={`name-${l}-${i}-${l}`}>
                {l}
              </span>
            ))}
          </p>
          <p>
            {Array.from('Member 2020-2024').map((l, i) => (
              <span data-animation key={`name-${l}-${i}-${l}`}>
                {l}
              </span>
            ))}
          </p>
        </div>
        <ul className={styles.gallery__list_items} ref={listRef}>
          {certificates.map((item, i) => (
            <li
              key={item.img}
              data-index={i}
              onPointerEnter={handleHover}
              onPointerLeave={handleHover}
            >
              <div>
                {Array.from(item.name).map((l, i) => (
                  <span data-animation key={`name-${l}-${i}-${l}`}>
                    {l}
                  </span>
                ))}
              </div>
              <div>
                {Array.from(item.contest).map((l, i) => (
                  <span data-animation key={`name-${l}-${i}-${l}`}>
                    {l}
                  </span>
                ))}
              </div>
              <div>
                {Array.from(item.type).map((l, i) => (
                  <span data-animation key={`name-${l}-${i}-${l}`}>
                    {l}
                  </span>
                ))}
              </div>
            </li>
          ))}
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Gallery;
