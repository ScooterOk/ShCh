import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useContext, useRef } from 'react';

const HomeHeroName = ({ styles }) => {
  const { isLoaded } = useContext(mainContext);

  const rootRef = useRef();

  useGSAP(
    () => {
      if (isLoaded) {
        gsap.timeline().from(rootRef.current.querySelectorAll('span'), {
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
    <div ref={rootRef} className={styles.name}>
      <p>
        {Array.from('Serhii Churilov').map((l, i) => (
          <span key={`name-${l}-${i}-${l}`}>{l}</span>
        ))}
      </p>
      <p>
        {Array.from('creates').map((l, i) => (
          <span key={`name-${l}-${i}-${l}`}>{l}</span>
        ))}
      </p>
    </div>
  );
};

export default HomeHeroName;
