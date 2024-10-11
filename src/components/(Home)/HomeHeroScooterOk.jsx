import { Line, useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { folder, useControls } from 'leva';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const HomeHeroScooterOk = () => {
  const [modelDimensions, setModelDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });
  const model = useGLTF('/models/buster_drone/scene.gltf');
  const { animations } = model;
  //   const gltf = useLoader(GLTFLoader, "/models/stacy.glb", "", (loader) => {
  //     console.log("loader", loader);
  //   });

  const lineRef = useRef();

  const { actions, ref, names } = useAnimations(animations);

  console.log('model', model);

  const scooterok = useThree();

  const { viewport, size } = scooterok;

  const w = scooterok.viewport.width * 2.3;

  useEffect(() => {
    const action = actions[names[0]];

    if (action) {
      action.reset().play();
    }
  }, [actions, names]);

  useEffect(() => {
    if (ref.current) {
      const box = new THREE.Box3().setFromObject(ref.current);
      const size = new THREE.Vector3();
      console.log(box, box.getSize(size));

      setModelDimensions({
        width: size.x,
        height: size.y,
        depth: size.z,
      });

      console.log('Model width:', size.x);
      console.log('Model height:', size.y);
      console.log('Model depth:', size.z);
    }
  }, [ref]);

  // const { value } = useControls({
  //   lerpLookAt: folder(
  //     {
  //       value: { value: 0, label: 'value', min: 0, max: 2, step: 0.01 },
  //     },
  //     { collapsed: true }
  //   ),
  // });

  const viewportWidth = viewport.width;
  const modelWidthInViewport =
    modelDimensions.width * (viewport.width / size.width);

  console.log('Viewport width:', viewportWidth);
  console.log('Model width in viewport:', modelWidthInViewport);

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 100; i++) {
      console.log('Math.sin(i)', i * 0.5, Math.sin(i * 0.5));
      pts.push(i / 100, Math.sin(i / 5) * 0.1, 0);
    }
    return pts;
  }, []);

  console.log('points', points);

  useFrame(({ clock, ...rest }) => {
    const time = clock.getElapsedTime();

    const pts = [];
    for (let i = 0; i < 100; i++) {
      pts.push(i / 100, Math.sin((i + time * -10) / 5) * 0.1, 0);
    }
    lineRef.current.geometry.setPositions(pts);
  });

  // useFrame(({ clock }) => {
  //   const time = clock.getElapsedTime();
  //   const pts = [];
  //   for (let i = 0; i < 100; i++) {
  //     pts.push(new THREE.Vector2(i / 100, Math.sin(i / 5) * 0.1));
  //   }
  //   lineRef.current.geometry.setFromPoints(pts);
  //   lineRef.current.geometry.attributes.position.needsUpdate = true;
  // });

  console.log('lineRef', lineRef, THREE);

  return (
    <Line
      ref={lineRef}
      points={points}
      color="lime"
      lineWidth={10}
      dashed={false}
    />
  );
  // return (
  //   <primitive ref={ref} object={scene} position={[0, -0.5, 0]} scale={1} />
  // );
};

export default HomeHeroScooterOk;
