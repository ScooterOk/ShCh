import React, { Suspense, useContext, useRef } from 'react';

import styles from './Recognition.module.scss';
import { Canvas } from '@react-three/fiber';
import AboutRecognitionTitle from '@/components/About/AboutRecognitionTitle';
import { useGSAP } from '@gsap/react';
import { mainContext } from '@/providers/MainProvider';
import gsap from 'gsap';
import Gallery from './Gallery';

const Recognition = () => {
  const container = useRef(null);
  const action = useRef(null);
  const imagesListRef = useRef();
  const lineRef = useRef();

  const { isLoaded } = useContext(mainContext);

  useGSAP(
    () => {
      if (isLoaded && action.current) {
        const words = container.current.querySelectorAll('[data-animation]');
        gsap
          .timeline({
            scrollTrigger: {
              trigger: container.current,
              start: '-=10% 60%',
              end: 'bottom bottom',
              markers: true,
            },
            id: 'about-recognition-init',
          })
          .to(
            action.current,
            {
              time: 0.5,
              duration: 1,
              ease: 'power3.inOut',
            },
            'start'
          )
          .from(
            lineRef.current,
            { scaleX: 0, duration: 1, ease: 'power3.inOut' },
            'start'
          )
          .from(
            imagesListRef.current,
            { scaleY: 0, duration: 1, ease: 'power3.inOut' },
            'start'
          )
          .to(
            action.current,
            {
              time: 1.5,
              duration: 1,
              ease: 'power3.Out',
            },
            'finish'
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
            'finish'
          );
      }
    },
    { dependencies: [isLoaded] }
  );

  return (
    <div ref={container} className={styles.recognition}>
      <div className={styles.title}>
        <Canvas
          camera={{ position: [0, 0, 1], orthographic: true }}
          gl={{ stencil: true }}
        >
          <Suspense fallback={null}>
            <AboutRecognitionTitle action={action} />
          </Suspense>
        </Canvas>
      </div>
      <Gallery imagesListRef={imagesListRef} lineRef={lineRef} />
    </div>
  );
};

export default Recognition;
