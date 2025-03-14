'use client';
import React, { useContext, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';

import gsap from 'gsap';

import Loader from '@/components/Loader/Loader';
import WorksPageCredits from '@/features/Works/Credits/WorksPageCredits';
import WorksPageHero from '@/features/Works/Hero/WorksPageHero';
import NextWork from '@/features/Works/NextWork/NextWork';
import { mainContext } from '@/providers/MainProvider';

import { koenigsegg } from '@/configs/works';

import styles from './page.module.scss';
import Image from 'next/image';
import cx from '@/utils/cx';

const medialist = [
  '/video/Koenigsegg/bg_koenigsegg_preview.mp4',
  '/video/Koenigsegg/08_screen_menu.mp4',
  '/video/Koenigsegg/07_screen_emotions.mp4',
  '/video/Koenigsegg/05_screen_aesthetic.mp4',
  '/video/Koenigsegg/04_screen_home.mp4',
  '/video/Koenigsegg/03_wheel.mp4',
  '/video/Koenigsegg/02_KOENIGSEGG_animation.mp4',
  '/models/next_work.gltf',
  '/video/audio_hover.mp3',
];

const Koenigsegg = () => {
  const { isLoaded, loadedMedia, resetMainProviderData } =
    useContext(mainContext);

  const scrollBarTrigger = useRef();

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

          // ScrollTrigger.create({
          //   id: 'scroll-bar-trigger',
          //   trigger: scrollBarTrigger.current,
          //   start: 'top 50%',
          //   end: 'bottom 50%',
          //   toggleClass: {
          //     targets: document.querySelector('[data-id="scrollbar"]'),
          //     className: 'light',
          //   },
          // });

          const media = gsap.utils.toArray('[data-media]');

          console.log('media', media);

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
        }
      }
    },
    { dependencies: [isLoaded, lenis] }
  );

  return (
    <main>
      <WorksPageHero {...koenigsegg.hero} />
      <div ref={scrollBarTrigger}>
        <div className={styles.fullwidth}>
          {loadedMedia?.['/video/Koenigsegg/bg_koenigsegg_preview.mp4'] && (
            <video
              preload="auto"
              muted
              playsInline
              loop
              autoPlay
              id="koenigsegg-media-bg"
            >
              <source
                src={
                  loadedMedia?.['/video/Koenigsegg/bg_koenigsegg_preview.mp4']
                }
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
              src={'/img/Koenigsegg/01_home_koenigsegg.png'}
              alt="koenigsegg-1"
              data-media
            />
            {loadedMedia?.['/video/Koenigsegg/02_KOENIGSEGG_animation.mp4'] && (
              <video preload="auto" muted playsInline loop autoPlay data-media>
                <source
                  src={
                    loadedMedia?.[
                      '/video/Koenigsegg/02_KOENIGSEGG_animation.mp4'
                    ]
                  }
                  type="video/mp4"
                />
              </video>
            )}
          </div>
          <div className={cx(styles.grid, styles.grid__v2)}>
            {loadedMedia?.['/video/Koenigsegg/03_wheel.mp4'] && (
              <video preload="auto" muted playsInline loop autoPlay data-media>
                <source
                  src={loadedMedia?.['/video/Koenigsegg/03_wheel.mp4']}
                  type="video/mp4"
                />
              </video>
            )}
            {loadedMedia?.['/video/Koenigsegg/03_wheel.mp4'] && (
              <video preload="auto" muted playsInline loop autoPlay data-media>
                <source
                  src={loadedMedia?.['/video/Koenigsegg/04_screen_home.mp4']}
                  type="video/mp4"
                />
              </video>
            )}
          </div>
          <div className={styles.fullwidth}>
            {loadedMedia?.['/video/Koenigsegg/05_screen_aesthetic.mp4'] && (
              <video preload="auto" muted playsInline loop autoPlay data-media>
                <source
                  src={
                    loadedMedia?.['/video/Koenigsegg/05_screen_aesthetic.mp4']
                  }
                  type="video/mp4"
                />
              </video>
            )}
          </div>
          <div className={cx(styles.grid, styles.grid__v3)}>
            <Image
              width={520}
              height={520}
              src={'/img/Koenigsegg/06_screen_aesthet0050.png'}
              alt="koenigsegg-6"
              data-media
            />

            {loadedMedia?.['/video/Koenigsegg/07_screen_emotions.mp4'] && (
              <video preload="auto" muted playsInline loop autoPlay data-media>
                <source
                  src={
                    loadedMedia?.['/video/Koenigsegg/07_screen_emotions.mp4']
                  }
                  type="video/mp4"
                />
              </video>
            )}
          </div>
          <div className={cx(styles.grid, styles.grid__v4)}>
            {loadedMedia?.['/video/Koenigsegg/08_screen_menu.mp4'] && (
              <video preload="auto" muted playsInline loop autoPlay data-media>
                <source
                  src={loadedMedia?.['/video/Koenigsegg/08_screen_menu.mp4']}
                  type="video/mp4"
                />
              </video>
            )}
            <Image
              width={640}
              height={640}
              src={'/img/Koenigsegg/09_screen_speed0000.png'}
              alt="koenigsegg-9"
              data-media
            />
          </div>
        </div>
      </div>

      <WorksPageCredits credits={koenigsegg.credits} />
      <NextWork name={'HEAVENSAKE'} />
      {!isLoaded && <Loader medialist={medialist} />}
    </main>
  );
};

export default Koenigsegg;
