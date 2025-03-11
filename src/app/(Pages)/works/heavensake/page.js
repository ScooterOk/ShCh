'use client';
import Loader from '@/components/Loader/Loader';
import { heavensake } from '@/configs/works';
import WorksPageCredits from '@/features/Works/Credits/WorksPageCredits';
import WorksPageHero from '@/features/Works/Hero/WorksPageHero';
import NextWork from '@/features/Works/NextWork/NextWork';
import { mainContext } from '@/providers/MainProvider';
import React, { useContext, useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

import styles from './page.module.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const medialist = [
  '/video/HEAVENSAKE/bg_preview_heavenSAKE.mp4',
  '/models/next_work.gltf',
  '/video/audio_hover.mp3',
];

const Heavensake = () => {
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

          ScrollTrigger.create({
            id: 'scroll-bar-trigger',
            trigger: scrollBarTrigger.current,
            start: 'top 50%',
            end: 'bottom 50%',
            toggleClass: {
              targets: document.querySelector('[data-id="scrollbar"]'),
              className: 'light',
            },
          });

          const media = gsap.utils.toArray('[data-media]');

          gsap.fromTo(
            '#heavensake-media-1',
            { clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0px 50%)' },
            {
              scrollTrigger: {
                trigger: '#heavensake-media-1',
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

  // Scrollbar trigger init
  // useGSAP(
  //   () => {
  //     if (lenis) {
  //       lenis.stop();
  //       ScrollTrigger.create({
  //         id: 'scroll-bar-trigger',
  //         trigger: footer.current,
  //         start: 'top 50%',
  //         end: 'bottom 50%',
  //         toggleClass: {
  //           targets: document.querySelector('[data-id="scrollbar"]'),
  //           className: 'light',
  //         },
  //       });
  //     }
  //   },
  //   { dependencies: [lenis] }
  // );

  // useGSAP(
  //   () => {

  //   },
  //   { dependencies: [] }
  // );

  return (
    <main>
      <WorksPageHero {...heavensake.hero} />
      <div ref={scrollBarTrigger}>
        <div className={styles.fullwidth}>
          {loadedMedia?.['/video/HEAVENSAKE/bg_preview_heavenSAKE.mp4'] && (
            <video
              preload="auto"
              muted
              playsInline
              loop
              id="heavensake-media-1"
            >
              <source
                src={
                  loadedMedia?.['/video/HEAVENSAKE/bg_preview_heavenSAKE.mp4']
                }
                type="video/mp4"
              />
            </video>
          )}
        </div>
        <div className={styles.article}>
          <div className={styles.staticwidth}>
            <img data-media src="/img/HEAVENSAKE/01.png" alt="HEAVENSAKE-1" />
            <img data-media src="/img/HEAVENSAKE/02.png" alt="HEAVENSAKE-2" />
          </div>
          <div className={styles.fullwidth}>
            <img data-media src="/img/HEAVENSAKE/03.png" alt="HEAVENSAKE-3" />
          </div>
          <div className={styles.staticwidth}>
            <img data-media src="/img/HEAVENSAKE/04.png" alt="HEAVENSAKE-4" />
            <img data-media src="/img/HEAVENSAKE/05.png" alt="HEAVENSAKE-5" />
          </div>
          <div className={styles.fullwidth}>
            <img data-media src="/img/HEAVENSAKE/06.png" alt="HEAVENSAKE-6" />
          </div>
          <div className={styles.staticwidth}>
            <img data-media src="/img/HEAVENSAKE/07.png" alt="HEAVENSAKE-7" />
            <img data-media src="/img/HEAVENSAKE/08.png" alt="HEAVENSAKE-8" />
          </div>
          <div className={styles.fullwidth}>
            <img data-media src="/img/HEAVENSAKE/09.png" alt="HEAVENSAKE-9" />
          </div>
          <div className={styles.staticwidth}>
            <img data-media src="/img/HEAVENSAKE/10.png" alt="HEAVENSAKE-10" />
            <img data-media src="/img/HEAVENSAKE/11.png" alt="HEAVENSAKE-11" />
          </div>
        </div>
      </div>

      <WorksPageCredits credits={heavensake.credits} />
      <NextWork name={'HEAVENSAKE'} />
      {!isLoaded && <Loader medialist={medialist} />}
    </main>
  );
};

export default Heavensake;
