import React, { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { MeshReflectorMaterial } from '@react-three/drei';
import { useThree, extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  EffectComposer,
  LensDistortionEffect,
  RenderPass,
  EffectPass,
  BrightnessContrastEffect,
} from 'postprocessing';
import { useGSAP } from '@gsap/react';

import Coub from './Coub';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

extend({ LensDistortionEffect });

let speed = 0;

// Post processing
const PostProcessing = () => {
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

  useFrame(() => composer.render(), 2);
  return null;
};

const CoubScene = ({ cameraRef, currentSlide, isHolded }) => {
  const modelRef = useRef();
  const cubeRef = useRef();

  const three = useThree();

  const { viewport } = three;

  useFrame((_, delta) => {
    // cubeRef.current.rotation.y += -(delta + speed * 0.0008) * 0.3;
    cubeRef.current.rotation.y -= delta * 0.35 + speed * 0.0001;
    // cubeRef.current.rotation.y += speed * -0.0001;
    speed *= 0.95;
  });

  const handleChange = (delta) => {
    console.log('handleChange', delta);

    speed += delta;
  };

  useGSAP(() => {
    gsap.from(cubeRef.current.scale, {
      x: 0.5,
      y: 0.5,
      z: 0.5,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
    // gsap.to(cubeRef.current.rotation, {
    //   y: Math.PI,
    //   duration: 20,
    //   ease: 'linear',
    //   repeat: -1,
    // });

    ScrollTrigger.observe({
      type: 'wheel,touch',
      id: 'scroll-trigger-observe',
      onChangeY: (e) => {
        if (e.event.type === 'wheel') handleChange(e.deltaY);
      },
      onChangeX: (e) => {
        if (e.event.type === 'touchmove') handleChange(-e.deltaX * 7);
      },
      tolerance: 100,
      // preventDefault: true,
    });
  });

  const modelScale = useMemo(() => {
    if (viewport.aspect < 1) {
      return viewport.aspect < 0.7 ? 0.7 : viewport.aspect;
    } else {
      return 1;
    }
  }, [viewport]);

  return (
    <group scale={modelScale}>
      <group ref={modelRef} rotation={[0, 0, 0]}>
        <Coub
          ref={cubeRef}
          isHolded={isHolded}
          currentSlide={currentSlide}
          cameraRef={cameraRef}
        />
      </group>
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} rotateX={-Math.PI / 2} />
        <MeshReflectorMaterial
          blur={[850, 590]}
          resolution={1024}
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
      <PostProcessing />
    </group>
  );
};

export default React.memo(CoubScene);
