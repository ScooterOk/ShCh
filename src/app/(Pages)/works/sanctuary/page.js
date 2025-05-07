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

import { sanctuary } from '@/configs/works';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './page.module.scss';

const medialist = [
  '/video/Sanctury/bg_preview_sactuary.mp4',
  '/models/next_work.gltf',
  '/video/audio_hover.mp3',
];

const SanctuaryAI = () => {
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
            '#sanctury-media-bg',
            { clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0px 50%)' },
            {
              onStart: () =>
                document.querySelector('#sanctury-media-bg video')?.play(),
              scrollTrigger: {
                trigger: '#sanctury-media-bg',
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
      <WorksPageHero {...sanctuary.hero} />
      <div
        className={cx(styles.fullwidth, styles.fullwidth__lg)}
        id="sanctury-media-bg"
      >
        {loadedMedia?.['/video/Sanctury/bg_preview_sactuary.mp4'] && (
          <video preload="auto" muted playsInline loop>
            <source
              src={loadedMedia?.['/video/Sanctury/bg_preview_sactuary.mp4']}
              type="video/mp4"
            />
          </video>
        )}
      </div>
      <div className={styles.article} data-scroll-color>
        <div className={cx(styles.grid, styles.grid__v1)}>
          <Image
            width={1280}
            height={850}
            src={'/img/Sanctury/sanc_010.png'}
            alt="sanctuary-1"
            data-media
          />
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source src={'/video/Sanctury/sancruary_02.mp4'} type="video/mp4" />
          </video>
        </div>
        <div className={cx(styles.grid, styles.grid__right)}>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source src={'/video/Sanctury/sanctuary_07.mp4'} type="video/mp4" />
          </video>
        </div>
        <div className={cx(styles.grid, styles.grid__left)}>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source src={'/video/Sanctury/sanctuary_01.mp4'} type="video/mp4" />
          </video>
        </div>
        <div className={cx(styles.grid, styles.grid__right)}>
          <Image
            width={1280}
            height={720}
            src={'/img/Sanctury/sanc_000.png'}
            alt="sanctuary-2"
            data-media
          />
        </div>
        <div className={cx(styles.grid, styles.grid__left)}>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source src={'/video/Sanctury/sancruary_04.mp4'} type="video/mp4" />
          </video>
        </div>
        <div className={cx(styles.grid, styles.grid__right)}>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source src={'/video/Sanctury/sancruary_05.mp4'} type="video/mp4" />
          </video>
        </div>
      </div>

      <WorksPageCredits credits={sanctuary.credits} />
      <NextWork {...sanctuary.nextWork} />
      {!isLoaded && <Loader medialist={medialist} />}
    </main>
  );
};

export default SanctuaryAI;
