'use client';
import React, { useContext, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';
import Image from 'next/image';

import gsap from 'gsap';
import cx from '@/utils/cx';

import Loader from '@/components/Loader/Loader';
import WorksPageCredits from '@/features/Works/Credits/WorksPageCredits';
import WorksPageHero from '@/features/Works/Hero/WorksPageHero';
import NextWork from '@/features/Works/NextWork/NextWork';
import { mainContext } from '@/providers/MainProvider';

import { mesmerized } from '@/configs/works';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './page.module.scss';

const medialist = [
  '/video/Mesmerized/bg_mesmerized.mp4',
  '/models/next_work.gltf',
  '/video/audio_hover.mp3',
];

const Mesmerized = () => {
  const { isLoaded, loadedMedia, resetMainProviderData } =
    useContext(mainContext);

  useEffect(() => {
    return () => resetMainProviderData();
  }, [resetMainProviderData]);

  const lenis = useLenis();

  useGSAP(
    () => {
      if (lenis) {
        lenis.stop();
        if (isLoaded) {
          lenis.start();

          const media = gsap.utils.toArray('[data-media]');
          const scrollSolor = gsap.utils.toArray('[data-scroll-color]');

          gsap.fromTo(
            '#mesmerized-media-bg',
            { clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0px 50%)' },
            {
              onStart: () =>
                document.querySelector('#mesmerized-media-bg video')?.play(),
              scrollTrigger: {
                trigger: '#mesmerized-media-bg',
                start: '-=10% 80%',
                end: 'bottom bottom',
              },
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0px 100%)',
              duration: 1.5,
              ease: 'power4.inOut',
            }
          );

          media.forEach((el) => {
            gsap.fromTo(
              el,
              { clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0px 50%)' },
              {
                scrollTrigger: {
                  trigger: el,
                  start: '-=10% 80%',
                  end: 'bottom bottom',
                },
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0px 100%)',
                duration: 1.5,
                ease: 'power4.inOut',
              }
            );
          });

          scrollSolor.forEach((el) => {
            ScrollTrigger.create({
              trigger: el,
              start: 'top 50%',
              end: 'bottom 50%',
              toggleClass: {
                targets: document.querySelector('[data-id="scrollbar"]'),
                className: 'light',
              },
            });
          });
        }
      }
    },
    { dependencies: [isLoaded, lenis] }
  );

  return (
    <main>
      <WorksPageHero {...mesmerized.hero} />
      <div
        className={cx(styles.fullwidth, styles.fullwidth__lg)}
        id="mesmerized-media-bg"
        data-scroll-color
      >
        {loadedMedia?.['/video/Mesmerized/bg_mesmerized.mp4'] && (
          <video preload="auto" muted playsInline loop>
            <source
              src={loadedMedia?.['/video/Mesmerized/bg_mesmerized.mp4']}
              type="video/mp4"
            />
          </video>
        )}
      </div>
      <div className={styles.article}>
        <div className={cx(styles.grid, styles.grid__v1)}>
          <Image
            width={1280}
            height={850}
            src={'/img/Mesmerized/02_mesmerized.png'}
            alt="mesmerized-1"
            data-media
          />
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source
              src={'/video/Mesmerized/SybmbolStarM_BW.mp4'}
              type="video/mp4"
            />
          </video>
        </div>
        <div className={cx(styles.grid, styles.grid__right)} data-scroll-color>
          <Image
            width={1280}
            height={720}
            src={'/img/Mesmerized/o1_mesmerized.png'}
            alt="mesmerized-2"
            data-media
          />
        </div>
        <div
          className={cx(styles.fullwidth, styles.fullwidth__lg)}
          data-media
          data-scroll-color
        >
          <Image
            width={1920}
            height={1080}
            src={'/img/Mesmerized/05_mesmerized.png'}
            alt="mesmerized-3"
            data-media
          />
        </div>
        <div
          className={cx(styles.fullwidth, styles.fullwidth__md)}
          data-media
          data-scroll-color
        >
          <Image
            width={1280}
            height={720}
            src={'/img/Mesmerized/04_mesmerized.png'}
            alt="mesmerized-4"
            data-media
          />
        </div>
      </div>

      <WorksPageCredits credits={mesmerized.credits} />
      <NextWork {...mesmerized.nextWork} />
      {!isLoaded && <Loader medialist={medialist} />}
    </main>
  );
};

export default Mesmerized;
