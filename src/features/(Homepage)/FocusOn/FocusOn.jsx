import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import CoubScene from '@/components/(Home)/CoubScene';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mainContext } from '@/providers/MainProvider';
import { useLenis } from 'lenis/react';

import styles from './FocusOn.module.scss';
import useMobile from '@/hooks/useMobile';
import { Observer } from 'gsap/Observer';

const position = {
  x: 0,
  y: 0,
};

const FocusOn = () => {
  const [mousePosition, setMousePosition] = useState({
    x: position.x,
    y: position.y,
  });
  const [currentSlideName, setCurrentSlideName] = useState('web');
  const lenis = useLenis();

  const { isMobile } = useMobile();

  const {
    isLoaded,
    setIsFocusEntered,
    setIsInit,
    currentFocusSlide,
    setCurrentFocusSlide,
    isHolded,
    setIsHolded,
    isTouched,
  } = useContext(mainContext);
  const container = useRef();
  const scrollBarTrigger = useRef();
  const cameraRef = useRef();
  const cubeRef = useRef();
  const cursorRef = useRef();
  const scrollRef = useRef();
  const breadcrumbsLineRef = useRef();

  const prevSlideRef = useRef(null);

  const onEnter = useCallback(() => {
    if (lenis.slideindex > -1 || gsap.getById('scrollTweenMobile')) return;

    let targets = gsap.utils.toArray([
      `.${styles.content__title} span`,
      `.${styles.content__breadcrumbs} span`,
      `.${styles.content__list}[data-name="web"] span`,
      cursorRef.current.querySelectorAll('[data-animation]'),
    ]);

    setIsFocusEntered(true);
    if (isMobile) {
      gsap.to(window, {
        id: 'scrollTweenOnEnter',
        duration: 1,
        scrollTo: container.current,
        ease: 'power2.out',
        overwrite: true,
      });
    }

    setCurrentFocusSlide(0);
    lenis.slideindex = 0;
    lenis.stop();

    gsap
      .timeline({
        onComplete: () => {
          const observer = Observer.getById('scroll-trigger-observe');
          observer?.enable();
        },
        id: 'cubeTweenOnEnter',
      })
      .add(() => {
        setIsInit(true);
        prevSlideRef.current = 0;
        setMousePosition({
          x: container.current.clientWidth / 2,
          y: container.current.clientHeight / 2,
        });
      })
      .set([`.${styles.content}`, cursorRef.current], { autoAlpha: 1 })
      .fromTo(
        cameraRef.current?.position,
        { z: isMobile ? 4.5 : 3 },
        {
          duration: 2.5,
          z: 4.5,
          ease: 'power2.out',
          overwrite: true,
        },
        'start'
      )
      .fromTo(
        cubeRef.current?.rotation,
        // { y: Math.PI * 2 + Math.PI / 2 },
        { y: isMobile ? Math.PI / 2 : Math.PI * 2 },
        {
          id: 'cube-rotation',
          y: 0,
          duration: isMobile ? 1 : 2.5,
          ease: isMobile ? 'power3.inOut' : 'power2.out',
          overwrite: true,
        },
        'start'
      )
      .fromTo(
        breadcrumbsLineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.01, overwrite: true },
        '-=1'
      )
      .fromTo(
        targets,
        { opacity: 0 },
        {
          duration: 0.01,
          opacity: 1,
          overwrite: true,
          stagger: {
            each: 0.05,
            grid: 'auto',
            from: 'random',
          },
        },
        '-=1'
      )
      .fromTo(
        cursorRef.current.querySelector(`.${styles.click_hold__line}`),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power1.in',
          overwrite: true,
        },
        '-=1'
      );
  }, [isMobile, lenis, setCurrentFocusSlide, setIsFocusEntered, setIsInit]);

  const onEnterBack = useCallback(() => {
    if (lenis.slideindex < 3 || gsap.getById('scrollTween')) return;

    lenis.stop();
    setCurrentFocusSlide(2);
    setCurrentSlideName('motion');
    lenis.slideindex = 2;
    let targets = gsap.utils.toArray([
      `.${styles.content__list}[data-name="motion"] span`,
    ]);
    gsap
      .timeline()
      .to(window, {
        id: 'scrollTween',
        duration: 1,
        scrollTo: container.current,
        ease: 'power2.out',
      })
      .to(cursorRef.current.querySelectorAll('[data-animation]'), {
        duration: 0.01,
        opacity: 1,
        stagger: {
          each: 0.03,
          grid: 'auto',
          from: 'random',
        },
      })
      .to(
        cursorRef.current.querySelector(`.${styles.click_hold__line}`),
        {
          scaleX: 1,
          duration: 1,
          ease: 'power1.in',
        },
        '-=1'
      )
      .fromTo(
        targets,
        { opacity: 0 },
        {
          duration: 0.01,
          opacity: 1,
          overwrite: true,
          stagger: {
            amount: 0.5,
            grid: 'auto',
            from: 'random',
          },
        },
        '-=1'
      );
  }, [lenis, setCurrentFocusSlide]);

  // ScrollTrigger FocusOn init
  useGSAP(
    () => {
      if (lenis) {
        const trigger = ScrollTrigger.getById('focus-on-trigger');
        if (trigger) trigger.kill();

        ScrollTrigger.create({
          id: 'focus-on-trigger',
          trigger: container.current,
          start: isMobile ? 'top 250px' : '-=10% 80%',
          end: 'bottom 100%-=250px',
          markers: true,

          onEnter,
          onEnterBack,
        });
      }
    },
    { dependencies: [lenis, isMobile] }
  );

  // ScrollTrigger ScrollBar init
  useGSAP(
    () => {
      if (lenis) {
        ScrollTrigger.create({
          id: 'scroll-bar-trigger',
          trigger: scrollBarTrigger.current,
          start: 'top 50%',
          end: 'bottom 50%',
          toggleClass: {
            targets: document.querySelector('[data-id="scrollbar"]'),
            className: 'light',
          },
        });
      }
    },
    { dependencies: [lenis] }
  );

  // OnHold cursor animation
  useEffect(() => {
    if (!isLoaded) return;
    gsap.to(cursorRef.current.querySelector(`.${styles.click_hold__line}`), {
      scaleX: isHolded ? 7 : 1,
      duration: 1,
      ease: isHolded ? 'none' : 'power3.out',
    });
    gsap
      .timeline()
      .to(cursorRef.current.querySelectorAll('[data-animation]'), {
        duration: 0.01,
        opacity: 0,
        stagger: {
          each: 0.03,
          grid: 'auto',
          from: 'random',
        },
      })
      .to(cursorRef.current.querySelectorAll('[data-animation]'), {
        duration: 0.01,
        opacity: 1,
        stagger: {
          each: 0.03,
          grid: 'auto',
          from: 'random',
        },
      });
  }, [isHolded, isLoaded]);

  // Cursor animation
  useEffect(() => {
    if (!isLoaded || currentFocusSlide > 3 || prevSlideRef.current === -1)
      return;

    gsap
      .timeline()
      .to(
        cursorRef.current.querySelectorAll('[data-animation]'),
        {
          duration: 0.01,
          opacity: 0,
          stagger: {
            each: 0.03,
            grid: 'auto',
            from: 'random',
          },
        },
        'start'
      )
      .to(
        cursorRef.current.querySelector(`.${styles.click_hold__line}`),
        {
          scaleX: 0,
          duration: 0.5,
          ease: 'power2.in',
        },
        'start'
      )
      .to(
        cursorRef.current.querySelectorAll('[data-animation]'),
        {
          duration: 0.01,
          opacity: 1,
          stagger: {
            each: 0.03,
            grid: 'auto',
            from: 'random',
          },
        },
        'finish'
      )
      .to(
        cursorRef.current.querySelector(`.${styles.click_hold__line}`),
        {
          scaleX: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        'finish'
      );
  }, [currentFocusSlide, isLoaded]);

  // Slide transitions animation
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

    const line = scrollRef.current.querySelector(
      `.${styles.scroll__line} span`
    );
    const scrollTargets =
      scrollRef.current.querySelectorAll('[data-animation]');

    if (nextSlide) {
      gsap.getById('scrollLine')?.kill();
      gsap
        .timeline({
          onComplete: () =>
            gsap.set(scrollRef.current, { visibility: 'visible' }),
        })
        .to(scrollTargets, {
          duration: 0.01,
          opacity: 0,
          stagger: {
            amount: 0.4,
            grid: 'auto',
            from: 'random',
          },
        })
        .to(line, { y: -100, duration: 1, ease: 'power3.out' });
    } else if (currentSlide !== 'web') {
      gsap.fromTo(
        scrollTargets,
        { opacity: 0 },
        {
          duration: 0.01,
          opacity: 1,
          stagger: {
            amount: 0.4,
            grid: 'auto',
            from: 'random',
          },
        }
      );
      gsap
        .timeline({ repeat: -1, delay: 1.1, id: 'scrollLine' })
        .set(line, { y: -100 })
        .to(line, { y: 0, duration: 1, ease: 'power3.out' })
        .to(line, { y: 100, duration: 1, ease: 'power3.out' });
    }

    if (!currentSlide) {
      setCurrentSlideName(nextSlide);
      return;
    }

    gsap
      .timeline({
        onComplete: () => (prevSlideRef.current = currentFocusSlide),
      })
      .set(breadcrumbsLineRef.current, { opacity: 0 })
      .to(currentTargets, {
        duration: 0.01,
        opacity: 0,
        stagger: {
          amount: 0.4,
          grid: 'auto',
          from: 'random',
        },
      })
      .add(() => setCurrentSlideName(nextSlide))
      .set(breadcrumbsLineRef.current, {
        opacity: !nextSlide && currentSlide === 'web' ? 0 : 1,
      })
      .to(nextTargets, {
        duration: 0.01,
        opacity: !nextSlide && currentSlide === 'web' ? 0 : 1,
        stagger: {
          amount: 0.4,
          grid: 'auto',
          from: 'random',
        },
      });
  }, [currentFocusSlide, setIsHolded]);

  const handleClickAndHold = useCallback(
    (e) => {
      if (currentFocusSlide < 0 || currentFocusSlide > 2) return;
      if (e.type === 'pointerdown') {
        setIsHolded(true);
      }
      if (e.type === 'pointerup') {
        setIsHolded(false);
      }
    },
    [currentFocusSlide, setIsHolded]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isTouched) return;
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
    },
    [isTouched]
  );

  // Mousemove init
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div ref={scrollBarTrigger}>
      <div
        ref={container}
        className={styles.focus}
        onPointerDown={handleClickAndHold}
        onPointerUp={handleClickAndHold}
        style={{
          '--mouse-x': `${mousePosition.x}`,
          '--mouse-y': `${mousePosition.y}`,
        }}
        // onMouseMove={handleMouseMove}
      >
        <div
          ref={cursorRef}
          className={clsx(styles.click_hold, isTouched && styles.disabled)}
        >
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
            <div
              className={styles.content__breadcrumbs_line}
              ref={breadcrumbsLineRef}
            />
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
        <div className={styles.scroll} ref={scrollRef}>
          <div className={styles.scroll__line}>
            <span />
          </div>
          <p>
            {Array.from('Scroll to discover').map((l, i) => (
              <span data-animation key={`name-${l}-${i}-${l}`}>
                {l}
              </span>
            ))}
          </p>
        </div>
        <Canvas shadows>
          <color attach="background" args={['#000000']} />
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 0.1, 4.5]}
          />
          <ambientLight intensity={4} />
          {/* <OrbitControls /> */}
          <Suspense fallback={null}>
            <CoubScene
              cubeRef={cubeRef}
              cameraRef={cameraRef}
              cursorRef={cursorRef}
              currentSlide={currentFocusSlide}
              isHolded={isHolded}
              styles={styles}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default FocusOn;
