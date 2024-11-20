import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './FocusOn.module.scss';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Grid,
  OrbitControls,
  PerspectiveCamera,
  useVideoTexture,
} from '@react-three/drei';
import CoubScene from '@/components/(Home)/CoubScene';
import { CameraHelper } from 'three';
import gsap from 'gsap';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';
import { mainContext } from '@/providers/MainProvider';

const FocusOn = () => {
  const [isHolded, setIsHolded] = useState(null);
  const [currentSlideName, setCurrentSlideName] = useState('web');

  const {
    setIsFocusEntered,
    setIsInit,
    currentFocusSlide,
    setCurrentFocusSlide,
  } = useContext(mainContext);
  const container = useRef();
  const cameraRef = useRef();
  const cubeRef = useRef();
  const distortionRef = useRef(0);
  const prevSlideRef = useRef(null);

  // const handleTestSlide = () => {
  //   setCurrentSlide((prev) => (prev < 4 ? prev + 1 : 0));
  // };

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: container.current,
        // markers: true,
        // pin: true,
        start: '-=10% 80%',
        end: 'bottom bottom', // just needs to be enough to not risk vibration where a user's fast-scroll shoots way past the end
        onEnter: () => {
          console.log('ENTER');

          let targets = gsap.utils.toArray([
            `.${styles.content__title} span`,
            `.${styles.content__breadcrumbs} span`,
            `.${styles.content__list}[data-name=${currentSlideName}] span`,
          ]);

          setIsFocusEntered(true);
          gsap
            .timeline()
            .add(() => {
              setIsInit(true);
              prevSlideRef.current = 0;
            })
            .fromTo(
              cameraRef.current?.position,
              { z: 4.3 },
              {
                duration: 2.5,
                z: 6,
                ease: 'power2.out',
              },
              'start'
            )
            .fromTo(
              cubeRef.current?.rotation,
              { y: Math.PI * 2 },
              {
                y: 0,
                duration: 2.5,
                ease: 'power2.out',
              },
              'start'
            )
            .set(`.${styles.content}`, { autoAlpha: 1, delay: 1 }, '-=2')
            .fromTo(
              targets,
              { opacity: 0 },
              {
                duration: 0.1,
                opacity: 1,
                stagger: {
                  each: 0.1,
                  grid: 'auto',
                  from: 'random',
                },
              },
              '-=1'
            );
        },
        onEnterBack: (self) => {
          console.log('onEnterBack');
          // if (intentObserver.isEnabled) { return } // in case the native scroll jumped backward past the start and then we force it back to where it should be.
          // self.scroll(self.end - 1); // jump to one pixel before the end of this section so we can hold there.
          // intentObserver.enable(); // STOP native scrolling
        },
      });
    },
    { dependencies: [setIsFocusEntered] }
  );

  useEffect(() => {
    if (prevSlideRef.current === null) return;
    const isDown = prevSlideRef.current < currentFocusSlide;

    const slides = ['web', 'brand', 'motion'];
    const currentSlide = isDown
      ? slides[currentFocusSlide - 1]
      : slides[currentFocusSlide + 1];
    const nextSlide = slides[currentFocusSlide];
    const currentTargets = gsap.utils.toArray([
      `.${styles.content__breadcrumbs} span`,
      `.${styles.content__list}[data-name=${currentSlide}] span`,
    ]);
    const nextTargets = gsap.utils.toArray([
      `.${styles.content__breadcrumbs} span`,
      `.${styles.content__list}[data-name=${nextSlide}] span`,
    ]);

    if (!currentSlide) {
      setCurrentSlideName(nextSlide);
      return;
    }
    gsap
      .timeline({
        onComplete: () => (prevSlideRef.current = currentFocusSlide),
      })
      .to(currentTargets, {
        duration: 0.1,
        opacity: 0,
        stagger: {
          each: 0.02,
          grid: 'auto',
          from: 'random',
        },
      })
      .add(() => setCurrentSlideName(nextSlide))
      .to(nextTargets, {
        duration: 0.1,
        opacity: 1,
        stagger: {
          each: 0.02,
          grid: 'auto',
          from: 'random',
        },
      });
  }, [currentFocusSlide]);

  const handleClickAndHold = useCallback((e) => {
    if (e.type === 'pointerdown') {
      setIsHolded(true);
    }
    if (e.type === 'pointerup') {
      setIsHolded(false);
    }
  }, []);

  return (
    <div
      ref={container}
      className={styles.focus}
      onPointerDown={handleClickAndHold}
      onPointerUp={handleClickAndHold}
    >
      <div className={clsx(styles.content, styles[currentSlideName])}>
        <h2 className={styles.content__title}>
          {Array.from('Focus On').map((l, i) => (
            <span key={`name-${l}-${i}-${l}`}>{l}</span>
          ))}
        </h2>
        <div className={clsx(styles.content__breadcrumbs)}>
          <p>
            {Array.from('Web Design/').map((l, i) => (
              <span key={`name-${l}-${i}-${l}`}>{l}</span>
            ))}
          </p>
          <p>
            {Array.from('Brand Design/').map((l, i) => (
              <span key={`name-${l}-${i}-${l}`}>{l}</span>
            ))}
          </p>
          <p>
            {Array.from('Motion Design/').map((l, i) => (
              <span key={`name-${l}-${i}-${l}`}>{l}</span>
            ))}
          </p>
        </div>
        <div className={styles.stack}>
          <ul className={clsx(styles.content__list)} data-name="web">
            <li>
              {Array.from('UX Design').map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </li>
            <li>
              {Array.from('UI Design').map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </li>
            <li>
              {Array.from('Art Direction').map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </li>
          </ul>

          <ul className={clsx(styles.content__list)} data-name="brand">
            <li>
              {Array.from('Logo Development').map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </li>
            <li>
              {Array.from('Brand Guidelines').map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </li>
            <li>
              {Array.from('Art Direction').map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </li>
            <li>
              {Array.from('Illustration').map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </li>
            <li>
              {Array.from('Typography').map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </li>
          </ul>

          <ul className={clsx(styles.content__list)} data-name="motion">
            <li>
              {Array.from('Storyboarding').map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </li>
            <li>
              {Array.from('2D Animation').map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </li>
            <li>
              {Array.from('3D Animation').map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </li>
            <li>
              {Array.from('Illustration').map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </li>
            <li>
              {Array.from('Content Creation').map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.click_hold}>Click&Hold</div>

      <Canvas shadows>
        <color attach="background" args={['#000000']} />
        <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={2} />

        {/* <Grid
          position={[0, 0, 0]}
          sectionSize={1}
          sectionColor={'white'}
          args={[10, 10]}
          cellSize={0.1}
          cellColor={'#ccc'}
        /> */}
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <CoubScene
            cubeRef={cubeRef}
            cameraRef={cameraRef}
            currentSlide={currentFocusSlide}
            isHolded={isHolded}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FocusOn;
