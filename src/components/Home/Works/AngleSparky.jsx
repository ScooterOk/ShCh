import React, { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HoverLink from '@/components/HoverLink/HoverLink';
import useMobile from '@/hooks/useMobile';

const AngleSparky = ({ styles }) => {
  const container = useRef();
  const angle2Ref = useRef();
  const sparkyRef = useRef();
  const scrollColorTriggerRef = useRef();
  const scrollColorTriggerMobileRef = useRef();
  const { isMobile } = useMobile();

  useGSAP(
    () => {
      // Scroll Bar Color Trigger
      ScrollTrigger.create({
        id: 'angle2Trigger',
        trigger: scrollColorTriggerMobileRef.current,
        start: 'top 50%',
        end: 'bottom 50%',
        toggleClass: {
          targets: document.querySelector('[data-id="scrollbar"]'),
          className: 'light',
        },
      });
      ScrollTrigger.create({
        trigger: scrollColorTriggerRef.current,
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
        .add(() => {
          angle2Ref.current.play();
          sparkyRef.current.play();
        })
        .from(container.current, {
          opacity: 0,
          duration: 0.5,
        })
        .to(
          '.angle2_sparky_media',
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
    const trigger = ScrollTrigger.getById('angle2Trigger');
    if (isMobile) {
      trigger.enable();
    } else {
      trigger.disable();
    }
  }, [isMobile]);

  return (
    <div className={styles.angle_sparky} ref={container}>
      <div className={styles.angle2}>
        <div
          ref={scrollColorTriggerMobileRef}
          className={clsx(styles.media, 'angle2_sparky_media')}
        >
          <video
            ref={angle2Ref}
            width="840"
            height="434"
            preload="auto"
            muted
            loop
            playsInline
          >
            <source src="/video/works/Angle2_preview.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.information}>
          <h3 className={styles.information__title}>
            {Array.from('Angle2 Agency').map((l, i) => (
              <span data-animation key={`name-${l}-${i}-${l}`}>
                {l}
              </span>
            ))}
          </h3>
          <p className={styles.information__description}>
            {Array.from(
              'Branding and Web Design for the Digital Agency Angle2.'
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
      <div className={styles.sparky}>
        <div ref={scrollColorTriggerRef}>
          <div className={clsx(styles.media, 'angle2_sparky_media')}>
            <video
              ref={sparkyRef}
              width="840"
              height="434"
              preload="auto"
              muted
              loop
              playsInline
            >
              <source src="/video/works/sparky_preview.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className={styles.information}>
          <h3 className={styles.information__title}>
            {Array.from('Sparky.Us').map((l, i) => (
              <span data-animation key={`name-${l}-${i}-${l}`}>
                {l}
              </span>
            ))}
          </h3>
          <p className={styles.information__description}>
            {Array.from('Web Design for the Digital Agency Sparky.').map(
              (l, i) => (
                <span data-animation key={`name-${l}-${i}-${l}`}>
                  {l}
                </span>
              )
            )}
          </p>
          <div className={styles.information__link}>
            <HoverLink href="/works/koenigsegg">View Case</HoverLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AngleSparky;
