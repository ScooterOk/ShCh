import HoverLink from '@/components/HoverLink';
import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useContext, useRef } from 'react';

const Koenigsegg = ({ styles }) => {
  const container = useRef();
  const mediaRef = useRef();

  useGSAP(
    () => {
      const words = container.current.querySelectorAll('[data-animation]');
      const each = 0.05;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: '-=10% 80%',
            end: 'bottom bottom',
          },
        })
        .add(() => mediaRef.current.play())
        .from(container.current, {
          opacity: 0,
          duration: 0.5,
        })
        .to(mediaRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0px 100%)',
          duration: 1.5,
          ease: 'power4.inOut',
        })
        .from(
          words,
          {
            duration: 0.1,
            opacity: 0,
            stagger: {
              each,
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
    <div className={styles.koenigsegg} ref={container}>
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
        <source src="/video/works/koenigsegg_preview.mp4" type="video/mp4" />
      </video>
      <div className={styles.information}>
        <h3 className={styles.information__title}>
          {Array.from('Koenigsegg').map((l, i) => (
            <span data-animation key={`name-${l}-${i}-${l}`}>
              {l}
            </span>
          ))}
        </h3>
        <p className={styles.information__description}>
          {Array.from(
            'Digital design concept for promo website Koenigsegg GEMERA'
          ).map((l, i) => (
            <span data-animation key={`name-${l}-${i}-${l}`}>
              {l}
            </span>
          ))}
        </p>
        <div className={styles.information__link}>
          <HoverLink href="/works/koenigsegg">View Case</HoverLink>
        </div>
      </div>
    </div>
  );
};

export default Koenigsegg;
