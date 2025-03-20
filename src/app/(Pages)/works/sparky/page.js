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

import { sparky } from '@/configs/works';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './page.module.scss';

const medialist = [
  '/video/Sparky/bg_sparky.mp4',
  '/models/next_work.gltf',
  '/video/audio_hover.mp3',
];

const Sparky = () => {
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
            '#sparky-media-bg',
            { clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0px 50%)' },
            {
              onStart: () =>
                document.querySelector('#sparky-media-bg video')?.play(),
              scrollTrigger: {
                trigger: '#sparky-media-bg',
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
      <WorksPageHero {...sparky.hero} />
      <div
        className={cx(styles.fullwidth, styles.fullwidth__lg)}
        id="sparky-media-bg"
        data-scroll-color
      >
        {loadedMedia?.['/video/Sparky/bg_sparky.mp4'] && (
          <video preload="auto" muted playsInline loop>
            <source
              src={loadedMedia?.['/video/Sparky/bg_sparky.mp4']}
              type="video/mp4"
            />
          </video>
        )}
      </div>
      <div className={styles.article}>
        <div className={cx(styles.grid, styles.grid__v1)}>
          <div data-media>
            <Image
              width={1280}
              height={850}
              src={'/img/Sparky/01_Intro_SPARKY.png'}
              alt="skyrocket-1"
              data-media
            />
          </div>
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source
                src={'/video/Sparky/sparky_mob_preload.mp4'}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <div className={cx(styles.grid, styles.grid__v2)} data-scroll-color>
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source
                src={'/video/Sparky/sparky_mob_services.mp4'}
                type="video/mp4"
              />
            </video>
          </div>
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source
                src={'/video/Sparky/sparky_home_01.mp4'}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <div
          className={cx(styles.fullwidth, styles.fullwidth__lg)}
          data-media
          data-scroll-color
        >
          <Image
            width={1920}
            height={987}
            src={'/img/Sparky/sparky_team.png'}
            alt="Sparky team"
          />
        </div>
        <div className={cx(styles.grid, styles.grid__v3)} data-scroll-color>
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source
                src={'/video/Sparky/sparky_mob_team.mp4'}
                type="video/mp4"
              />
            </video>
          </div>
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source
                src={'/video/Sparky/sparky_services_03.mp4'}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <div className={cx(styles.grid, styles.grid__v4)}>
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source
                src={'/video/Sparky/sparky_team_04.mp4'}
                type="video/mp4"
              />
            </video>
          </div>
          <div data-media data-scroll-color>
            <Image
              width={375}
              height={667}
              src={'/img/Sparky/Eror_404_SPARKY(375).png'}
              alt="404"
            />
          </div>
        </div>
      </div>

      <WorksPageCredits credits={sparky.credits} />
      <NextWork {...sparky.nextWork} />
      {!isLoaded && <Loader medialist={medialist} />}
    </main>
  );
};

export default Sparky;
