import {
  Helper,
  MeshReflectorMaterial,
  useHelper,
  useTexture,
  useVideoTexture,
} from '@react-three/drei';
import { useThree, extend, useFrame } from '@react-three/fiber';

// import * as postprocessing from '@react-three/postprocessing';
import {
  BrightnessContrast,
  EffectComposer as Composer,
} from '@react-three/postprocessing';
import {
  EffectComposer,
  LensDistortionEffect,
  RenderPass,
  EffectPass,
  Pass,
} from 'postprocessing';
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';

import { LensDistortionPassGen } from 'three-lens-distortion';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass';
import { folder, useControls } from 'leva';

extend({ LensDistortionEffect });

const LensDistortion = () => {
  const { gl } = useThree();
  const composer = useMemo(() => new EffectComposer(gl), [gl]);
  // const { value } = useControls({
  //   Distortion: folder(
  //     {
  //       value: { value: 0, label: 'value', min: -1, max: 1, step: 0.1 },
  //     },
  //     { collapsed: true }
  //   ),
  // });

  // const effect = useMemo(
  //   () =>
  //     new LensDistortionEffect({
  //       distortion: new THREE.Vector2(value, value),
  //       focalLength: new THREE.Vector2(1 + value * 0.25, 1 + value * 0.25),
  //     }),
  //   [value]
  // );

  // useEffect(() => {
  //   composer.addPass(new RenderPass(scene, camera));
  //   composer.addPass(new EffectPass(camera, effect));
  //   console.log('valuee', effect);
  // }, [composer, scene, camera, effect]);

  useFrame(() => composer.render(), 2);

  return null;
};

const CoubScene = () => {
  const light = useRef();
  const cubeRef = useRef();
  const three = useThree();

  console.log('three', three.camera);

  const params = {
    distortion: new THREE.Vector2(0.5, 0.5),
    principalPoint: new THREE.Vector2(0, 0),
    focalLength: new THREE.Vector2(0.5, 0.5),
    skew: 0,
  };

  // useEffect(() => {
  //   scene.add(new DirectionalLightHelper(light.current));
  // }, [scene]);

  const intro_slide_1 = useVideoTexture('/video/CUBE_01_intro.mp4', {
    start: false,
  });
  const loop_slide_1 = useVideoTexture('/video/CUBE_01_loop.mp4', {
    start: false,
  });
  const intro_slide_2 = useVideoTexture('/video/CUBE_02_intro.mp4', {
    start: false,
  });
  const loop_slide_2 = useVideoTexture('/video/CUBE_02_loop.mp4', {
    start: false,
  });
  const intro_slide_3 = useVideoTexture('/video/CUBE_03_intro.mp4', {
    start: false,
  });
  const loop_slide_3 = useVideoTexture('/video/CUBE_03_loop.mp4', {
    start: false,
  });

  const loop_slide_4 = useVideoTexture('/video/CUBE_03_loop.mp4');

  const [slide1, setSlide1] = useState(intro_slide_1);
  const [slide2, setSlide2] = useState(intro_slide_2);
  const [slide3, setSlide3] = useState(intro_slide_3);

  console.log('cubeRef', cubeRef.current);

  // CUBE ROTATION USED FRAME
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (cubeRef.current) {
      cubeRef.current.rotation.y = time * 0.25;
    }
  });

  return (
    <>
      <group>
        <mesh ref={cubeRef} position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial attach={'material-0'} map={slide3} />
          <meshStandardMaterial attach={'material-1'} map={slide1} />
          <meshBasicMaterial attach={'material-2'} color={'#cccccc'} />
          <meshBasicMaterial attach={'material-3'} color={'#cccccc'} />
          <meshBasicMaterial attach={'material-4'} map={loop_slide_4} />
          <meshBasicMaterial attach={'material-5'} map={slide2} />
        </mesh>
        {/* <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2, 1, 1]} />
          <meshStandardMaterial roughness={0.5} metalness={0} />
        </mesh> */}
      </group>
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} rotateX={-Math.PI / 2} />
        {/* <meshStandardMaterial roughness={0} metalness={0} /> */}
        <MeshReflectorMaterial
          blur={[500, 50]}
          resolution={1024}
          mixBlur={1}
          mixStrength={100}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#202020"
          metalness={0.8}
        />
      </mesh>

      <Composer>
        <LensDistortion />
        <BrightnessContrast
          brightness={0.06} // brightness. min: -1, max: 1
          contrast={0.15} // contrast: min -1, max: 1
        />
      </Composer>

      <ambientLight intensity={2} />

      {/* <directionalLight position={[5, 5, 0]} intensity={5} ref={light} /> */}

      {/* <rectAreaLight
        ref={light}
        width={2}
        height={1}
        intensity={2}
        color={'#1fc600'}
        position={[0, 1, 0]}
      /> */}
    </>
  );
};

export default CoubScene;
