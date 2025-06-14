import React, { Suspense, useContext, useEffect, useMemo, useRef } from 'react';
import { MeshReflectorMaterial } from '@react-three/drei';
import { useThree, extend, useFrame } from '@react-three/fiber';
import {
  EffectComposer,
  LensDistortionEffect,
  RenderPass,
  EffectPass,
  BrightnessContrastEffect,
} from 'postprocessing';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useLenis } from 'lenis/react';
import * as THREE from 'three';

import { mainContext } from '@/providers/MainProvider';

import Coub from './Coub';

import CreativenceObjects from './CreativenceObjects';
import InnovisObjects from './InnovisObjects';
import useMobile from '@/hooks/useMobile';

extend({ LensDistortionEffect });

// Post processing
const PostProcessing = ({ isHolded }) => {
  const { gl, scene, camera } = useThree();
  const composer = useMemo(() => new EffectComposer(gl), [gl]);
  const distortionEffectRef = useRef(
    new LensDistortionEffect({
      distortion: new THREE.Vector2(0, 0),
      focalLength: new THREE.Vector2(1, 1),
    })
  );

  const brightnessContrastEffect = useRef(
    new BrightnessContrastEffect({ brightness: 0.1, contrast: 0.18 })
  );

  composer.removeAllPasses();
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(
    new EffectPass(
      camera,
      brightnessContrastEffect.current,
      distortionEffectRef.current
    )
  );

  useEffect(() => {
    // if (currentSlide > 2) return;
    if (isHolded) {
      gsap.to(distortionEffectRef.current.distortion, {
        x: -0.25,
        y: -0.25,
        duration: 1,
      });
      gsap.to(distortionEffectRef.current.focalLength, {
        x: 0.9,
        y: 0.9,
        duration: 1,
      });
    } else {
      gsap.to(distortionEffectRef.current.distortion, {
        x: 0,
        y: 0,
        duration: 1,
      });
      gsap.to(distortionEffectRef.current.focalLength, {
        x: 1,
        y: 1,
        duration: 1,
      });
    }
  }, [isHolded]);

  // useEffect(() => {
  //   if (isFocusEntered && !isMobile) {
  //     gsap.from(distortionEffectRef.current.distortion, {
  //       x: -0.27,
  //       y: -0.27,
  //       duration: 2.5,
  //       ease: 'power2.out',
  //     });
  //     gsap.from(distortionEffectRef.current.focalLength, {
  //       x: 0.9,
  //       y: 0.9,
  //       duration: 2.5,
  //       ease: 'power2.out',
  //     });
  //   }
  // }, [isFocusEntered, isMobile]);

  useFrame(() => composer.render(), 2);

  return null;
};

const CoubScene = ({
  cameraRef,
  cubeRef,
  cursorRef,
  currentSlide,
  isHolded,
  styles,
}) => {
  const modelRef = useRef();

  const lenis = useLenis();
  const { isLoaded, setIsHolded, loadedMedia } = useContext(mainContext);

  const three = useThree();

  const { viewport } = three;

  const { isMobile } = useMobile();

  const modelScale = useMemo(() => {
    if (viewport.aspect < 1) {
      return viewport.aspect < 0.7 ? 0.7 : viewport.aspect;
    } else {
      return 1;
    }
  }, [viewport]);

  useEffect(() => {
    if (
      !isLoaded ||
      currentSlide > 2 ||
      !lenis ||
      gsap.getById('scrollTweenOnEnter') ||
      gsap.getById('cubeTweenOnEnter')
    )
      return;

    // Reset cube if slide is out of range
    if (currentSlide === 2 || currentSlide === -1) {
      Observer.getById('scroll-trigger-observe')?.disable();
      setIsHolded(false);
    }

    gsap.to(cubeRef.current.rotation, {
      y: currentSlide === -1 ? Math.PI / 2 : (-Math.PI / 2) * currentSlide,
      duration: 1,
      ease: 'power3.inOut',
      id: 'cube-rotation',
      onComplete: () => {
        if (currentSlide === 2) {
          gsap.to(window, {
            id: 'scrollTween',
            duration: 1.5,
            scrollTo: lenis.actualScroll + 251,
            ease: 'power2.inOut',
            onComplete: () => {
              lenis.start();
            },
          });
          gsap.to(cursorRef.current.querySelectorAll('[data-animation]'), {
            duration: 0.1,
            opacity: 0,
            stagger: {
              each: 0.03,
              grid: 'auto',
              from: 'random',
            },
          });
          gsap.to(
            cursorRef.current.querySelector(`.${styles.click_hold__line}`),
            {
              scaleX: 0,
              duration: 1,
              ease: 'power1.out',
            }
          );
        }
      },
    });
  }, [
    cubeRef,
    currentSlide,
    cursorRef,
    isLoaded,
    lenis,
    setIsHolded,
    styles.click_hold__line,
  ]);

  return (
    <group scale={modelScale}>
      <group ref={modelRef} rotation={[0, 0, 0]}>
        {isLoaded && (
          <Coub
            ref={cubeRef}
            isHolded={isHolded}
            currentSlide={currentSlide}
            cameraRef={cameraRef}
          />
        )}
        <Suspense fallback={null}>
          {loadedMedia?.['/models/about_creativence.gltf'] && (
            <CreativenceObjects isHolded={isHolded} />
          )}
        </Suspense>

        <Suspense fallback={null}>
          {loadedMedia?.['/models/about_innovis.gltf'] && (
            <InnovisObjects isHolded={isHolded} />
          )}
        </Suspense>
      </group>
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} rotateX={-Math.PI / 2} />
        <MeshReflectorMaterial
          // blur={[850, 590]}
          blur={isMobile ? [250, 190] : [850, 590]}
          resolution={isMobile ? 512 : 1024}
          mixBlur={4.2}
          mixStrength={220}
          roughness={0.21}
          depthScale={1}
          minDepthThreshold={0.7}
          maxDepthThreshold={1.1}
          color="#090909"
          metalness={0.82}
        />
      </mesh>
      <PostProcessing isHolded={isHolded} currentSlide={currentSlide} />
    </group>
  );
};

export default React.memo(CoubScene);
