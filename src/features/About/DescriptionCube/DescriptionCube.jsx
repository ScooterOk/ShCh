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

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mainContext } from '@/providers/MainProvider';
import { useLenis } from 'lenis/react';

import styles from './DescriptionCube.module.scss';
import useMobile from '@/hooks/useMobile';
import { Observer } from 'gsap/Observer';
import CoubScene from '@/components/About/CoubScene';

const videoSourseSize = 1;

const position = {
  x: 0,
  y: 0,
};

const slides = ['creativence', 'innovis'];

let timeout;

const DescriptionCube = () => {
  const [mousePosition, setMousePosition] = useState({
    x: position.x,
    y: position.y,
  });
  const [currentSlideName, setCurrentSlideName] = useState('creativence');

  const lenis = useLenis();

  const { isMobile, isTouch } = useMobile();

  const {
    isLoaded,
    setIsFocusEntered,
    setIsInit,
    currentDescriptionSlide,
    setCurrentDescriptionSlide,
    isHolded,
    setIsHolded,
    loadedMedia,
  } = useContext(mainContext);
  const container = useRef();
  const scrollBarTrigger = useRef();
  const cameraRef = useRef();
  const cubeRef = useRef();
  const cursorRef = useRef();
  const scrollRef = useRef();

  const prevSlideRef = useRef(null);

  const onEnter = useCallback(() => {
    if (lenis.slideindex > -1 || gsap.getById('scrollTweenMobile')) return;

    let targets = gsap.utils.toArray([
      `.${styles.content} > p[data-name="creativence"] span`,
      cursorRef.current.querySelectorAll('[data-animation]'),
    ]);

    setIsFocusEntered(true);
    gsap.to(window, {
      id: 'scrollTweenOnEnter',
      duration: 1,
      scrollTo: container.current,
      ease: 'power2.out',
      overwrite: true,
    });

    setCurrentDescriptionSlide(0);
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
        // setMousePosition({
        //   x: container.current.clientWidth / 2,
        //   y: container.current.clientHeight / 2,
        // });
      })
      .set([`.${styles.content}`, cursorRef.current], { autoAlpha: 1 })
      .fromTo(
        cubeRef.current?.rotation,
        { y: Math.PI / 2 },
        {
          id: 'cube-rotation',
          y: 0,
          duration: 1,
          ease: 'power3.inOut',
          overwrite: true,
        }
      )
      .fromTo(
        targets,
        { opacity: 0 },
        {
          duration: 0.01,
          opacity: 1,
          overwrite: true,
          stagger: {
            amount: 0.75,
            grid: 'auto',
            from: 'random',
          },
        },
        'finish'
      )
      .fromTo(
        cursorRef.current.querySelector(`.${styles.click_hold__line}`),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power3.inOut',
          overwrite: true,
        },
        'finish'
      );
  }, [lenis, setCurrentDescriptionSlide, setIsFocusEntered, setIsInit]);

  const onEnterBack = useCallback(() => {
    if (lenis.slideindex < 2 || gsap.getById('scrollTween')) return;

    lenis.stop();
    setCurrentDescriptionSlide(1);
    setCurrentSlideName('motion');
    lenis.slideindex = 1;
    let targets = gsap.utils.toArray([
      `.${styles.content} > p[data-name="innovis"] span`,
    ]);

    gsap
      .timeline({
        onComplete: () => {
          const observer = Observer.getById('scroll-trigger-observe');
          observer?.enable();
        },
      })
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
  }, [lenis, setCurrentDescriptionSlide]);

  // ScrollTrigger FocusOn init
  useGSAP(
    () => {
      if (lenis) {
        const trigger = ScrollTrigger.getById('description-cube-trigger');
        if (trigger) trigger.kill();

        ScrollTrigger.create({
          id: 'description-cube-trigger',
          trigger: container.current,
          start: 'top 250px',
          end: 'bottom 100%-=250px',
          onEnter,
          onEnterBack,
        });
      }
    },
    { dependencies: [lenis, isMobile] }
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
    if (
      !isLoaded ||
      currentDescriptionSlide > 2 ||
      gsap.getById('cubeTweenOnEnter') ||
      prevSlideRef.current === -1
    )
      return;

    const timeline = gsap
      .timeline()
      .to(
        cursorRef.current.querySelectorAll('[data-animation]'),
        {
          duration: 0.01,
          opacity: 0,
          overwrite: true,
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
          overwrite: true,
        },
        'start'
      );

    if (currentDescriptionSlide > -1 && currentDescriptionSlide < 2) {
      timeline
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
    }
  }, [currentDescriptionSlide, isLoaded]);

  // Slide transitions animation
  useEffect(() => {
    if (prevSlideRef.current === null || gsap.getById('cubeTweenOnEnter'))
      return;

    const isDown = prevSlideRef.current < currentDescriptionSlide;

    const currentSlide = isDown
      ? slides[currentDescriptionSlide - 1]
      : slides[currentDescriptionSlide + 1];
    const nextSlide = slides[currentDescriptionSlide];

    const currentTargets = `.${styles.content} > p[data-name=${currentSlide}] span`;
    const nextTargets = `.${styles.content} > p[data-name=${nextSlide}] span`;

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
    } else if (currentSlide !== 'creativence') {
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
        onComplete: () => (prevSlideRef.current = currentDescriptionSlide),
      })
      .to(currentTargets, {
        duration: 0.01,
        opacity: 0,
        stagger: {
          amount: 0.4,
          grid: 'auto',
          from: 'random',
        },
      })
      .add(() => {
        if (nextSlide) setCurrentSlideName(nextSlide);
      });

    if (document.querySelectorAll(nextTargets).length) {
      gsap.to(nextTargets, {
        duration: 0.01,
        opacity: !nextSlide && currentSlide === 'creativence' ? 0 : 1,
        stagger: {
          amount: 0.4,
          grid: 'auto',
          from: 'random',
        },
      });
    }
  }, [currentDescriptionSlide, setIsHolded]);

  const handleClickAndHold = (e) => {
    if (currentDescriptionSlide < 0 || currentDescriptionSlide > 1) {
      if (isTouch) clearTimeout(timeout);
      return;
    }

    if (e.type === 'pointerdown') {
      if (isTouch) {
        timeout = setTimeout(() => setIsHolded(true), 300);
      } else {
        setIsHolded(true);
      }
    }

    if (e.type === 'pointerup') {
      if (isTouch) clearTimeout(timeout);
      setIsHolded(false);
    }
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (isTouch) return;
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
    [isTouch]
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
        className={clsx(
          styles.focus,
          currentDescriptionSlide > -1 &&
            currentDescriptionSlide < 2 &&
            styles.active
        )}
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
          className={clsx(styles.click_hold, isTouch && styles.disabled)}
        >
          <div className={styles.click_hold__line} />
          {Array.from('Click&Hold').map((l, i) => (
            <span data-animation key={`name-${l}-${i}-${l}`}>
              {l}
            </span>
          ))}
        </div>
        <div className={clsx(styles.content, styles[currentSlideName])}>
          <p data-name="creativence">
            {Array.from(
              'Pushing creative boundaries for brands, tech, entertainment, music, arts, culture, and architecture.'
            ).map((l, i) => (
              <span key={`name-${l}-${i}-${l}`}>{l}</span>
            ))}
          </p>
          <p data-name="innovis">
            {Array.from(
              'Continuously exploring innovative visual approaches and discovering new ways to engage and interact with audiences.'
            ).map((l, i) => (
              <span key={`name-${l}-${i}-${l}`}>{l}</span>
            ))}
          </p>
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

        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          {loadedMedia?.['/video/CUBE_01_full.mp4'] && (
            <video
              id="material_slide_1"
              playsInline
              muted
              preload="auto"
              style={{ width: videoSourseSize, height: videoSourseSize }}
            >
              <source
                src={loadedMedia?.['/video/CUBE_01_full.mp4']}
                type="video/mp4"
              />
            </video>
          )}
          {loadedMedia?.['/video/CUBE_02_full.mp4'] && (
            <video
              id="material_slide_2"
              playsInline
              muted
              preload="auto"
              style={{ width: videoSourseSize, height: videoSourseSize }}
            >
              <source
                src={loadedMedia?.['/video/CUBE_02_full.mp4']}
                type="video/mp4"
              />
            </video>
          )}
          {loadedMedia?.['/video/CUBE_04_full.mp4'] && (
            <video
              id="material_slide_4"
              playsInline
              autoPlay
              muted
              loop
              style={{ width: videoSourseSize, height: videoSourseSize }}
            >
              <source
                src={loadedMedia?.['/video/CUBE_04_full.mp4']}
                type="video/mp4"
              />
            </video>
          )}
        </div>

        <Canvas
          shadows={false}
          gl={{
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: true,
          }}
        >
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
              currentSlide={currentDescriptionSlide}
              isHolded={isHolded}
              styles={styles}
            />
            {/* <mesh>
              <boxGeometry />
              <meshStandardMaterial color="hotpink" />
            </mesh> */}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default DescriptionCube;
