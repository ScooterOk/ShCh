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

import { skyrocket } from '@/configs/works';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './page.module.scss';

const medialist = [
  '/video/Skyrocket/bg_skyrocket_preview.mp4',
  '/models/next_work.gltf',
  '/video/audio_hover.mp3',
];

const Skyrocket = () => {
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
            '#koenigsegg-media-bg',
            { clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0px 50%)' },
            {
              scrollTrigger: {
                trigger: '#koenigsegg-media-bg',
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
      <WorksPageHero {...skyrocket.hero} />
      <div
        className={cx(styles.fullwidth, styles.fullwidth__lg)}
        id="koenigsegg-media-bg"
        data-scroll-color
      >
        {loadedMedia?.['/video/Skyrocket/bg_skyrocket_preview.mp4'] && (
          <video preload="auto" muted playsInline loop autoPlay>
            <source
              src={loadedMedia?.['/video/Skyrocket/bg_skyrocket_preview.mp4']}
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
            src={'/img/Skyrocket/01_Home Desktop 1440.png'}
            alt="skyrocket-1"
            data-media
          />
          <Image
            width={720}
            height={720}
            src={'/img/Skyrocket/02_logo_sr.png'}
            alt="skyrocket-2"
            data-media
          />
        </div>
        <div className={cx(styles.grid, styles.grid__v2)} data-scroll-color>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source
              src={'/video/Skyrocket/03_t1_for_social.mp4'}
              type="video/mp4"
            />
          </video>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source
              src={'/video/Skyrocket/04_CoPilotUPD2.mp4'}
              type="video/mp4"
            />
          </video>
        </div>
        <div
          className={cx(styles.fullwidth, styles.fullwidth__lg)}
          data-media
          data-scroll-color
        >
          <Image
            width={1920}
            height={1080}
            src={'/img/Skyrocket/05_bg_logotype.png'}
            alt="Skyrocket-5"
            data-media
          />
        </div>
        <div className={cx(styles.grid, styles.grid__v3)}>
          <Image
            width={520}
            height={520}
            src={'/img/Skyrocket/06_iconography.png'}
            alt="Skyrocket-6"
            data-media
          />
          <Image
            width={1280}
            height={720}
            src={'/img/Skyrocket/07_Frame 86.png'}
            alt="Skyrocket-7"
            data-media
          />
        </div>
        <div className={cx(styles.grid, styles.grid__v4)} data-scroll-color>
          <Image
            width={960}
            height={960}
            src={'/img/Skyrocket/08_Frame 107.png'}
            alt="Skyrocket-8"
            data-media
          />
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source
              src={'/video/Skyrocket/09_3d_icons_520.mp4'}
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <WorksPageCredits credits={skyrocket.credits} />
      <NextWork {...skyrocket.nextWork} />
      {!isLoaded && <Loader medialist={medialist} />}
    </main>
  );
};

export default Skyrocket;
