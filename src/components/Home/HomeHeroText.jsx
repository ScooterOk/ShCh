import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useContext, useRef } from 'react';

const HomeHeroText = ({ styles, setRenderReady }) => {
  const { isLoaded } = useContext(mainContext);

  const rootRef = useRef();

  useGSAP(
    () => {
      if (isLoaded) {
        gsap
          .timeline({ delay: 2, onComplete: () => setRenderReady(true) })
          .from(rootRef.current.querySelectorAll('span'), {
            duration: 0.01,
            autoAlpha: 0,
            stagger: {
              amount: 0.75,
              grid: 'auto',
              from: 'random',
            },
          });
      }
    },
    { dependencies: [isLoaded] }
  );

  return (
    <div ref={rootRef} className={styles.text}>
      <p>
        {Array.from('that promote and tell your brand story in a new way').map(
          (l, i) => (
            <span key={`name-${l}-${i}-${l}`}>{l}</span>
          )
        )}
      </p>
    </div>
  );
};

export default HomeHeroText;
