import React, { Suspense, useContext, useRef, useState } from 'react';

import styles from './Description.module.scss';
import { Canvas } from '@react-three/fiber';
import AboutDescriptionTitle from '@/components/About/AboutDescriptionTitle';
import { useGSAP } from '@gsap/react';
import { mainContext } from '@/providers/MainProvider';
import gsap from 'gsap';

const Description = () => {
  const container = useRef();
  const line = useRef();
  const [action, setAction] = useState(null);

  const { isLoaded, loadedVideos } = useContext(mainContext);

  useGSAP(
    () => {
      if (isLoaded && action) {
        const words = container.current.querySelectorAll('[data-animation]');

        gsap
          .timeline({
            scrollTrigger: {
              trigger: container.current,
              start: '-=10% 70%',
              end: 'bottom bottom',
            },
            id: 'about-description-title-init',
          })
          .to(
            action,
            {
              time: 0.5,
              duration: 1,
              ease: 'power3.inOut',
            },
            'start'
          )
          .from(
            line.current,
            { scaleY: 0, duration: 1, ease: 'power3.inOut' },
            'start'
          )
          .to(
            action,
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
    { dependencies: [isLoaded, action] }
  );

  return (
    <div className={styles.description} ref={container}>
      <div className={styles.title}>
        <div className={styles.title__text}>
          <p>
            {Array.from('+ years of experience,').map((l, i) => (
              <span data-animation key={`name-${l}-${i}-${l}`}>
                {l}
              </span>
            ))}
          </p>
          <p>
            {Array.from('learning, experimenting').map((l, i) => (
              <span data-animation key={`name-${l}-${i}-${l}`}>
                {l}
              </span>
            ))}
          </p>
        </div>
        <div className={styles.title__canvas}>
          <Canvas
            camera={{ position: [0, 0, 1], orthographic: true }}
            gl={{ stencil: true }}
          >
            <Suspense fallback={null}>
              {loadedVideos?.['/models/10.gltf'] && (
                <AboutDescriptionTitle setAction={setAction} />
              )}
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className={styles.text}>
        <div ref={line} className={styles.text__line} />
        {Array.from(
          "Serhii Churilov, based in Kyiv, Ukraine, specializes in crafting immersive digital design experiences that elevate brand narratives, helping brands connect with their audiences through creative storytelling and visually compelling design. With a keen understanding of both aesthetic appeal and user experience, Serhii develops custom solutions that communicate a brand’s values and vision. Whether through web design, interactive media, or branding elements, his work aims to leave a memorable impression while staying true to each brand's unique identity."
        ).map((l, i) => (
          <span data-animation key={`name-${l}-${i}-${l}`}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Description;
