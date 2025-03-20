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

import { angle2 } from '@/configs/works';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './page.module.scss';

const medialist = [
  '/video/angle2/bg_angle2.mp4',
  '/models/next_work.gltf',
  '/video/audio_hover.mp3',
];

const Angle2 = () => {
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
      <WorksPageHero {...angle2.hero} />
      <div
        className={cx(styles.fullwidth, styles.fullwidth__lg)}
        id="koenigsegg-media-bg"
        data-scroll-color
      >
        {loadedMedia?.['/video/angle2/bg_angle2.mp4'] && (
          <video preload="auto" muted playsInline loop autoPlay>
            <source
              src={loadedMedia?.['/video/angle2/bg_angle2.mp4']}
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
            src={'/img/angle2/home_01_angle2.jpg'}
            alt="angle2-1"
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
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source src={'/video/angle2/mob_angle2.mp4'} type="video/mp4" />
            </video>
          </div>
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source
                src={'/video/angle2/home_interactive.mp4'}
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
          <video preload="auto" muted playsInline loop autoPlay>
            <source
              src={'/video/angle2/teem_interections.mp4'}
              type="video/mp4"
            />
          </video>
        </div>
        <div className={cx(styles.grid, styles.grid__v3)} data-scroll-color>
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source src={'/video/angle2/mob_projects.mp4'} type="video/mp4" />
            </video>
          </div>
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source
                src={'/video/angle2/projects_interections.mp4'}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <div className={cx(styles.grid, styles.grid__v4)}>
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source
                src={'/video/angle2/start_interections.mp4'}
                type="video/mp4"
              />
            </video>
          </div>
          <div data-media data-scroll-color>
            <video preload="auto" muted playsInline loop autoPlay>
              <source src={'/video/angle2/mob_cta.mp4'} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <WorksPageCredits credits={angle2.credits} />
      <NextWork {...angle2.nextWork} />
      {!isLoaded && <Loader medialist={medialist} />}
    </main>
  );
};

export default Angle2;
