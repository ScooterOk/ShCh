import {
  Helper,
  MeshReflectorMaterial,
  useHelper,
  useTexture,
  useVideoTexture,
} from '@react-three/drei';
import { useThree, extend, useFrame } from '@react-three/fiber';

// import * as postprocessing from '@react-three/postprocessing';
import { EffectComposer as Composer } from '@react-three/postprocessing';
import {
  EffectComposer,
  LensDistortionEffect,
  RenderPass,
  EffectPass,
  Pass,
} from 'postprocessing';
import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import { DirectionalLightHelper } from 'three';
import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';

import { LensDistortionPassGen } from 'three-lens-distortion';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass';
import { folder, useControls } from 'leva';

extend({ LensDistortionEffect });

const LensDistortion = (props) => {
  const { scene, camera, gl } = useThree();
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
  const video = useRef();
  const three = useThree();

  const params = {
    distortion: new THREE.Vector2(0.5, 0.5),
    principalPoint: new THREE.Vector2(0, 0),
    focalLength: new THREE.Vector2(0.5, 0.5),
    skew: 0,
  };

  // useEffect(() => {
  //   scene.add(new DirectionalLightHelper(light.current));
  // }, [scene]);

  const texture = useVideoTexture('/video/Hero_head_video_02.mp4');

  return (
    <>
      <group>
        <mesh position={[0, 0.49, 0]}>
          <boxGeometry args={[2, 1, 1]} />
          <meshBasicMaterial ref={video} attach={'material-0'} map={texture} />
          <meshBasicMaterial attach={'material-1'} color={'#00ff00'} />
          <meshBasicMaterial attach={'material-2'} color={'#0000ff'} />
          <meshBasicMaterial attach={'material-3'} color={'#ffff00'} />
          <meshBasicMaterial attach={'material-4'} color={'#ff00ff'} />
          <meshBasicMaterial attach={'material-5'} color={'#00ffff'} />
        </mesh>
        {/* <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2, 1, 1]} />
          <meshStandardMaterial roughness={0.5} metalness={0} />
        </mesh> */}
      </group>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} rotateX={-Math.PI / 2} />
        {/* <meshStandardMaterial roughness={0} metalness={0} /> */}
        <MeshReflectorMaterial
          blur={[300, 50]}
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
      </Composer>

      <ambientLight intensity={2} />
      {/* <directionalLight position={[5, 5, 0]} intensity={1} ref={light} /> */}
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
