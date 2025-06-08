import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HoverLink from '@/components/HoverLink/HoverLink';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMobile from '@/hooks/useMobile';

const Heavensake = ({ styles }) => {
  const container = useRef();
  const mediaRef = useRef();

  const { isMobile } = useMobile();

  useGSAP(
    () => {
      // Scroll Bar Color Trigger
      ScrollTrigger.create({
        id: 'heavensakeTrigger',
        trigger: mediaRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        toggleClass: {
          targets: document.querySelector('[data-id="scrollbar"]'),
          className: 'light',
        },
      });

      const words = container.current.querySelectorAll(
        '#heavensake [data-animation]'
      );
      const link = container.current.querySelector(
        `.${styles.information__link}`
      );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: '-=10% bottom',
            end: 'bottom bottom',
          },
        })
        .add(() => mediaRef.current.play())
        .from(container.current, {
          opacity: 0,
          duration: 0.5,
        })
        .to(
          mediaRef.current,
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

  // Enable/Disable ScrollTrigger on Mobile
  useEffect(() => {
    const trigger = ScrollTrigger.getById('heavensakeTrigger');
    if (isMobile) {
      trigger.enable();
    } else {
      trigger.disable();
    }
  }, [isMobile]);

  return (
    <div className={styles.koenigsegg} id="heavensake" ref={container}>
      <video
        className={styles.media}
        ref={mediaRef}
        width="1280"
        height="769"
        preload="auto"
        muted
        loop
        playsInline
      >
        <source src="/video/works/keavensake_preview.mp4" type="video/mp4" />
      </video>
      <div className={styles.information}>
        <h3 className={styles.information__title}>
          {Array.from('HEAVENSAKE').map((l, i) => (
            <span data-animation key={`name-${l}-${i}-${l}`}>
              {l}
            </span>
          ))}
        </h3>
        <p className={styles.information__description}>
          {Array.from(
            'Rebranding for HEAVENSAKE, a luxury sake brand that embodies a unique combination of Japanese tradition and French artistry, helmed by the acclaimed French cellar master Régis Camus.'
          ).map((l, i) => (
            <span data-animation key={`name-${l}-${i}-${l}`}>
              {l}
            </span>
          ))}
        </p>
        <div className={styles.information__link}>
          <HoverLink href="/works/heavensake">View Case</HoverLink>
        </div>
      </div>
    </div>
  );
};

export default Heavensake;
