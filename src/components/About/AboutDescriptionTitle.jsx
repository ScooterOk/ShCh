import React, { useContext, useEffect, useState } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

import { useAnimations, useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

import configs from '@/configs/titlesAnimation';
import { mainContext } from '@/providers/MainProvider';

const { duration, easeEnter, easeLeave } = configs;
const animatingNodes = {};

const AboutDescriptionTitle = ({ setAction }) => {
  const [widthScale, setWidthScale] = useState(1);
  const [modelDimensions, setModelDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });
  const { loadedMedia } = useContext(mainContext);

  const model = useGLTF(loadedMedia['/models/10.gltf']);

  const { animations, nodes } = model;

  const material = new THREE.MeshBasicMaterial({ color: 0x9b9b88 });
  const { actions, ref, names } = useAnimations(animations);

  const three = useThree();

  const { viewport } = three;

  useEffect(() => {
    const action = actions[names[0]];
    action.reset();
    action.paused = true;
    action.play();
    setAction(action);
  }, [actions, names, setAction]);

  useEffect(() => {
    if (ref.current) {
      const box = new THREE.Box3().setFromObject(ref.current);
      const size = new THREE.Vector3();
      box.getSize(size);

      setModelDimensions({
        width: size.x,
        height: size.y,
        depth: size.z,
      });
    }
  }, [ref]);

  useEffect(() => {
    const w = (viewport.width / modelDimensions.width) * 1.4;
    setWidthScale(w);
  }, [modelDimensions.width, viewport.width]);

  const handlePointerEnter = (e) => {
    if (gsap.getById('hero-title-init')?.isActive()) return;

    const target = e.eventObject.morphTargetInfluences;
    const name = e.eventObject.name;
    if (animatingNodes?.[name]?.isActive()) animatingNodes?.[name].kill();
    animatingNodes[name] = gsap.to(target, {
      [0]: 1,
      duration,
      ease: easeEnter,
      overwrite: true,
    });
  };

  const handlePointerLeave = (e) => {
    if (gsap.getById('hero-title-init')?.isActive()) return;

    const target = e.eventObject.morphTargetInfluences;
    const name = e.eventObject.name;
    if (!animatingNodes?.[name]?.isActive()) {
      gsap.to(target, {
        [0]: 0,
        duration,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });
    } else {
      animatingNodes?.[name].eventCallback('onComplete', () => {
        gsap.to(target, {
          [0]: 0,
          duration,
          ease: easeLeave,
        });
      });
    }
  };

  return (
    <group ref={ref} dispose={null} position={[0, 0, 0]} scale={widthScale}>
      <group>
        <group name="Null" position={[-0.041, 0.018, 0]} scale={0.089}>
          <mesh
            name="0"
            castShadow
            receiveShadow
            geometry={nodes['0'].geometry}
            material={material}
            morphTargetDictionary={nodes['0'].morphTargetDictionary}
            morphTargetInfluences={nodes['0'].morphTargetInfluences}
            position={[-22.833, -9.37, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="1"
            castShadow
            receiveShadow
            geometry={nodes['1'].geometry}
            material={material}
            morphTargetDictionary={nodes['1'].morphTargetDictionary}
            morphTargetInfluences={nodes['1'].morphTargetInfluences}
            position={[-22.833, -9.37, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
        </group>
      </group>
    </group>
  );
};

export default AboutDescriptionTitle;
