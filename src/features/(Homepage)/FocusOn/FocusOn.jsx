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
import { useLenis } from 'lenis/react';

const position = {
  x: 0,
  y: 0,
};

const FocusOn = () => {
  const [isHolded, setIsHolded] = useState(null);
  const [mousePosition, setMousePosition] = useState({
    x: position.x,
    y: position.y,
  });
  const [currentSlideName, setCurrentSlideName] = useState('web');
  const lenis = useLenis();

  const {
    setIsFocusEntered,
    setIsInit,
    currentFocusSlide,
    setCurrentFocusSlide,
  } = useContext(mainContext);
  const container = useRef();
  const cameraRef = useRef();
  const cubeRef = useRef();
  const cursorRef = useRef();

  const prevSlideRef = useRef(null);

  // const handleTestSlide = () => {
  //   setCurrentSlide((prev) => (prev < 4 ? prev + 1 : 0));
  // };

  useGSAP(
    () => {
      if (lenis) {
        ScrollTrigger.create({
          trigger: container.current,
          // pin: true,
          start: '-=10% 80%',
          end: 'bottom 80%', // just needs to be enough to not risk vibration where a user's fast-scroll shoots way past the end

          onEnter: () => {
            console.log('ENTER');

            let targets = gsap.utils.toArray([
              `.${styles.content__title} span`,
              `.${styles.content__breadcrumbs} span`,
              `.${styles.content__list}[data-name=${currentSlideName}] span`,
              cursorRef.current.querySelectorAll('[data-animation]'),
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
            console.log('onEnterBack', lenis);
            lenis.stop();
            gsap.to(window, {
              id: 'scrollTween',
              duration: 1,
              scrollTo: container.current,
              ease: 'power2.out',
              // onComplete: () => (scrollTweenActive = false),
            });
            // if (intentObserver.isEnabled) { return } // in case the native scroll jumped backward past the start and then we force it back to where it should be.
            // self.scroll(self.end - 1); // jump to one pixel before the end of this section so we can hold there.
            // intentObserver.enable(); // STOP native scrolling
          },
        });
      }
    },
    { dependencies: [setIsFocusEntered, lenis] }
  );

  useEffect(() => {
    console.log('isHolded', isHolded);
    gsap.to(cursorRef.current.querySelector(`.${styles.click_hold__line}`), {
      scaleX: isHolded ? 7 : 1,
      duration: 1,
      ease: isHolded ? 'none' : 'power3.out',
    });
    gsap
      .timeline()
      .to(cursorRef.current.querySelectorAll('[data-animation]'), {
        duration: 0.1,
        opacity: 0,
        stagger: {
          each: 0.03,
          grid: 'auto',
          from: 'random',
        },
      })
      .to(cursorRef.current.querySelectorAll('[data-animation]'), {
        duration: 0.1,
        opacity: 1,
        stagger: {
          each: 0.03,
          grid: 'auto',
          from: 'random',
        },
      });
  }, [isHolded]);

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

  const handleMouseMove = (e) => {
    gsap.to(position, {
      x: e.clientX,
      y: e.clientY,
      duration: 1,
      ease: 'power3.out',
      onUpdate: () => {
        setMousePosition({
          x: position.x,
          y: position.y,
        });
      },
    });
  };

  return (
    <div
      ref={container}
      className={styles.focus}
      onPointerDown={handleClickAndHold}
      onPointerUp={handleClickAndHold}
      style={{
        '--mouse-x': `${mousePosition.x}`,
        '--mouse-y': `${mousePosition.y}`,
      }}
      onMouseMove={handleMouseMove}
    >
      <div ref={cursorRef} className={styles.click_hold}>
        <div className={styles.click_hold__line} />
        {Array.from('Click&Hold').map((l, i) => (
          <span data-animation key={`name-${l}-${i}-${l}`}>
            {l}
          </span>
        ))}
      </div>
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
