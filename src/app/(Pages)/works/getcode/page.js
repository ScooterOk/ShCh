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

import { getcode } from '@/configs/works';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './page.module.scss';

const medialist = [
  '/video/Getcode/bg_getcode_home_10.mp4',
  '/models/next_work.gltf',
  '/video/audio_hover.mp3',
];

const Getcode = () => {
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
            '#getcode-media-bg',
            { clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0px 50%)' },
            {
              onStart: () =>
                document.querySelector('#getcode-media-bg video')?.play(),
              scrollTrigger: {
                trigger: '#getcode-media-bg',
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
                  start: '-=10% bottom',
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
      <WorksPageHero {...getcode.hero} />
      <div
        className={cx(styles.fullwidth, styles.fullwidth__lg)}
        id="getcode-media-bg"
        data-scroll-color
      >
        {loadedMedia?.['/video/Getcode/bg_getcode_home_10.mp4'] && (
          <video preload="auto" muted playsInline loop>
            <source
              src={loadedMedia?.['/video/Getcode/bg_getcode_home_10.mp4']}
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
              src={'/img/Getcode/getcode_home_01.png'}
              alt="getcode-1"
              data-media
            />
          </div>
          <div data-media>
            <Image
              width={1000}
              height={1000}
              src={'/img/Getcode/logo_getcode.png'}
              alt="getcode-2"
              data-media
            />
          </div>
        </div>
        <div className={cx(styles.grid, styles.grid__v2)} data-scroll-color>
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source
                src={'/video/Getcode/getcode_home_03.mp4'}
                type="video/mp4"
              />
            </video>
          </div>
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source
                src={'/video/Getcode/getcode_home_08.mp4'}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <div className={cx(styles.fullwidth, styles.fullwidth__lg)} data-media>
          <Image
            width={1920}
            height={803}
            src={'/img/Getcode/getcode_02.png'}
            alt="Sparky team"
          />
        </div>
        <div className={cx(styles.grid, styles.grid__v3)} data-scroll-color>
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source
                src={'/video/Getcode/getcode_home_05.mp4'}
                type="video/mp4"
              />
            </video>
          </div>
          <div data-media>
            <video preload="auto" muted playsInline loop autoPlay>
              <source
                src={'/video/Getcode/getcode_home_09.mp4'}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <div className={cx(styles.grid, styles.grid__v4)}>
          <div data-media>
            <Image
              width={375}
              height={667}
              src={'/img/Getcode/getcode_home_07.png'}
              alt="getcode-3"
            />
          </div>
          <div data-media data-scroll-color>
            <video preload="auto" muted playsInline loop autoPlay>
              <source
                src={'/video/Getcode/getcode_home_04.mp4'}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>

      <WorksPageCredits credits={getcode.credits} />
      <NextWork {...getcode.nextWork} />
      {!isLoaded && <Loader medialist={medialist} />}
    </main>
  );
};

export default Getcode;
