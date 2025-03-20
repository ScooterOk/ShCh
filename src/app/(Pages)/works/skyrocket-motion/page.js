'use client';
import React, { useContext, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';

import gsap from 'gsap';
import cx from '@/utils/cx';

import Loader from '@/components/Loader/Loader';
import WorksPageCredits from '@/features/Works/Credits/WorksPageCredits';
import WorksPageHero from '@/features/Works/Hero/WorksPageHero';
import NextWork from '@/features/Works/NextWork/NextWork';
import { mainContext } from '@/providers/MainProvider';

import { skyrocketMotion } from '@/configs/works';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './page.module.scss';

const medialist = [
  '/video/SkyrocketMotion/bg_skyrocket_animecase.mp4',
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
            '#skyrocket-motion-media-bg',
            { clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0px 50%)' },
            {
              onStart: () =>
                document
                  .querySelector('#skyrocket-motion-media-bg video')
                  ?.play(),
              scrollTrigger: {
                trigger: '#skyrocket-motion-media-bg',
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
      <WorksPageHero {...skyrocketMotion.hero} />
      <div
        className={cx(styles.fullwidth, styles.fullwidth__lg)}
        id="skyrocket-motion-media-bg"
        data-scroll-color
      >
        {loadedMedia?.['/video/SkyrocketMotion/bg_skyrocket_animecase.mp4'] && (
          <video preload="auto" muted playsInline loop>
            <source
              src={
                loadedMedia?.[
                  '/video/SkyrocketMotion/bg_skyrocket_animecase.mp4'
                ]
              }
              type="video/mp4"
            />
          </video>
        )}
      </div>
      <div className={styles.article} data-scroll-color>
        <div className={cx(styles.grid, styles.grid__v1)}>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source
              src={'/video/SkyrocketMotion/MapleOrganics_case.mp4'}
              type="video/mp4"
            />
          </video>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source
              src={'/video/SkyrocketMotion/PrecisiionOS_case.mp4'}
              type="video/mp4"
            />
          </video>
        </div>
        <div className={cx(styles.grid, styles.grid__v2)}>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source
              src={'/video/SkyrocketMotion/AmericanGrit_Case.mp4'}
              type="video/mp4"
            />
          </video>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source
              src={'/video/SkyrocketMotion/Kidzsmart.mp4'}
              type="video/mp4"
            />
          </video>
        </div>
        <div className={cx(styles.grid, styles.grid__v1)}>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source
              src={'/video/SkyrocketMotion/OceanWise_case.mp4'}
              type="video/mp4"
            />
          </video>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source
              src={'/video/SkyrocketMotion/Alterna_Case.mp4'}
              type="video/mp4"
            />
          </video>
        </div>
        <div className={cx(styles.grid, styles.grid__v2)}>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source
              src={'/video/SkyrocketMotion/Thinkific.mp4'}
              type="video/mp4"
            />
          </video>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source
              src={'/video/SkyrocketMotion/Imperial_case.mp4'}
              type="video/mp4"
            />
          </video>
        </div>
        <div className={cx(styles.grid, styles.grid__v1)}>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source
              src={'/video/SkyrocketMotion/WestFraser_Case.mp4'}
              type="video/mp4"
            />
          </video>
          <video preload="auto" muted playsInline loop autoPlay data-media>
            <source
              src={'/video/SkyrocketMotion/Musecraft_case.mp4'}
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <WorksPageCredits credits={skyrocketMotion.credits} />
      <NextWork {...skyrocketMotion.nextWork} />
      {!isLoaded && <Loader medialist={medialist} />}
    </main>
  );
};

export default Skyrocket;
