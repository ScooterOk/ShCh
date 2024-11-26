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
import WebObjects from './WebObjects';
import BrandObjects from './BrandObjects';
import MotionObjects from './MotionObjects';
import { mainContext } from '@/providers/MainProvider';
import { useLenis } from 'lenis/react';
import Coub from './Coub';
import * as THREE from 'three';

extend({ LensDistortionEffect });

// Post processing
const PostProcessing = ({ isHolded, currentSlide }) => {
  const { gl, scene, camera } = useThree();
  const composer = useMemo(() => new EffectComposer(gl), [gl]);
  const { isFocusEntered } = useContext(mainContext);
  const distortionEffectRef = useRef(
    new LensDistortionEffect({
      distortion: new THREE.Vector2(0, 0),
      focalLength: new THREE.Vector2(1, 1),
    })
  );

  const brightnessContrastEffect = useRef(
    new BrightnessContrastEffect({ brightness: 0.1, contrast: 0.15 })
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

  // const { value } = useControls({
  //   Distortion: folder(
  //     {
  //       value: { value: 0, label: 'value', min: -1, max: 1, step: 0.01 },
  //     },
  //     { collapsed: true }
  //   ),
  // });

  useEffect(() => {
    if (currentSlide > 2) return;
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

  useEffect(() => {
    if (isFocusEntered) {
      gsap.from(distortionEffectRef.current.distortion, {
        x: -0.27,
        y: -0.27,
        duration: 2.5,
        ease: 'power2.out',
      });
      gsap.from(distortionEffectRef.current.focalLength, {
        x: 0.9,
        y: 0.9,
        duration: 2.5,
        ease: 'power2.out',
      });
    }
  }, [isFocusEntered]);

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
  const { isLoaded } = useContext(mainContext);

  useEffect(() => {
    if (currentSlide < 0 || currentSlide > 3 || !lenis) return;
    gsap.to(modelRef.current.rotation, {
      y: (-Math.PI / 2) * currentSlide,
      duration: 1,
      ease: 'power3.inOut',
      id: 'cube-rotation',
      onComplete: () => {
        if (currentSlide === 3) {
          gsap.to(window, {
            id: 'scrollTween',
            duration: 1.5,
            scrollTo: lenis.actualScroll + 251,
            ease: 'power2.inOut',
            onComplete: () => lenis.start(),
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
  }, [currentSlide, cursorRef, lenis, styles.click_hold__line]);

  return (
    <group>
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
          <WebObjects isHolded={isHolded} />
        </Suspense>
        <Suspense fallback={null}>
          <BrandObjects isHolded={isHolded} />
        </Suspense>
        <Suspense fallback={null}>
          <MotionObjects isHolded={isHolded} />
        </Suspense>
      </group>
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} rotateX={-Math.PI / 2} />
        <MeshReflectorMaterial
          blur={[500, 50]}
          resolution={1024}
          mixBlur={1}
          mixStrength={100}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#161616"
          metalness={0.8}
        />
      </mesh>
      <PostProcessing isHolded={isHolded} currentSlide={currentSlide} />
    </group>
  );
};

export default React.memo(CoubScene);
