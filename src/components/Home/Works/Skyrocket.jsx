import HoverLink from '@/components/HoverLink/HoverLink';
import TransitionLink from '@/components/TransitionLink/TransitionLink';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import React, { useRef } from 'react';

const Skyrocket = ({ styles }) => {
  const container = useRef();
  const imageRef = useRef();
  const mediaRef = useRef();

  useGSAP(
    () => {
      // Scroll Bar Color Trigger
      ScrollTrigger.create({
        trigger: mediaRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        toggleClass: {
          targets: document.querySelector('[data-id="scrollbar"]'),
          className: 'light',
        },
      });

      const words = container.current.querySelectorAll('[data-animation]');
      const link = container.current.querySelector(
        `.${styles.information__link}`
      );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: 'bottom bottom',
          },
        })
        .add(() => mediaRef.current.play())
        .from(container.current, {
          opacity: 0,
          duration: 0.5,
        })
        .to(
          gsap.utils.toArray([imageRef.current, mediaRef.current]),
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0px 100%)',
            duration: 1.5,
            ease: 'power4.inOut',
          },
          'clip'
        )
        .fromTo(
          link,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.5, ease: 'power4.inOut' },
          'clip'
        )
        .from(
          words,
          {
            duration: 0.01,
            opacity: 0,
            stagger: {
              amount: 0.5,
              grid: 'auto',
              from: 'random',
            },
          },
          '-=0.5'
        );
    },
    { dependencies: [] }
  );

  return (
    <div className={styles.skyrocket} ref={container}>
      <div className={styles.media}>
        <div className={styles.media__logo} ref={imageRef}>
          <Image
            src="/img/logo_sky.svg"
            width="82"
            height="70"
            alt="Skyrocket"
          />
        </div>
        <div className={styles.media__video}>
          <video
            ref={mediaRef}
            width="1280"
            height="769"
            preload="auto"
            muted
            loop
            playsInline
          >
            <source src="/video/works/Skyrocket_preview.mp4" type="video/mp4" />
          </video>
          <div className={styles.information}>
            <h3 className={styles.information__title}>
              {Array.from('Skyrocket').map((l, i) => (
                <span data-animation key={`name-${l}-${i}-${l}`}>
                  {l}
                </span>
              ))}
            </h3>
            <p className={styles.information__description}>
              {Array.from(
                'Brand, Web and Motion Design for the Digital Agency SKYROCKET'
              ).map((l, i) => (
                <span data-animation key={`name-${l}-${i}-${l}`}>
                  {l}
                </span>
              ))}
            </p>
            <div className={styles.information__link}>
              <HoverLink Component={TransitionLink} href="/works/skyrocket">
                View Case
              </HoverLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skyrocket;
