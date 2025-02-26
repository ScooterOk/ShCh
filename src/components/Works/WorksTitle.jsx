import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useContext, useEffect, useState } from 'react';

import * as THREE from 'three';

import { useThree } from '@react-three/fiber';
import configs from '@/configs/titlesAnimation';
import gsap from 'gsap';
import { mainContext } from '@/providers/MainProvider';

const animatingNodes = {};

const { duration, easeEnter, easeLeave } = configs;

const WorksTitle = ({ setAction }) => {
  const [widthScale, setWidthScale] = useState(1);
  const [modelDimensions, setModelDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });

  const { loadedMedia } = useContext(mainContext);

  const model = useGLTF(loadedMedia['/models/all_works.gltf']);

  const { animations, nodes } = model;

  const { actions, ref, names } = useAnimations(animations);

  const three = useThree();

  const { viewport } = three;

  useEffect(() => {
    const action = actions[names[0]];
    action.reset();
    action.paused = true;
    action.play();
    setAction(actions[names[0]]);
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
    const w = (viewport.width / modelDimensions.width) * 1.056;
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
        <group name="Layer_1" position={[0.13, -0.14, 0]} scale={0.059}>
          <mesh
            name="s"
            castShadow
            receiveShadow
            geometry={nodes.s.geometry}
            material={nodes.s.material}
            morphTargetDictionary={nodes.s.morphTargetDictionary}
            morphTargetInfluences={nodes.s.morphTargetInfluences}
            position={[-21.287, -7.107, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="k"
            castShadow
            receiveShadow
            geometry={nodes.k.geometry}
            material={nodes.k.material}
            morphTargetDictionary={nodes.k.morphTargetDictionary}
            morphTargetInfluences={nodes.k.morphTargetInfluences}
            position={[-21.287, -7.107, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="r"
            castShadow
            receiveShadow
            geometry={nodes.r.geometry}
            material={nodes.r.material}
            morphTargetDictionary={nodes.r.morphTargetDictionary}
            morphTargetInfluences={nodes.r.morphTargetInfluences}
            position={[-21.287, -7.107, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="o"
            castShadow
            receiveShadow
            geometry={nodes.o.geometry}
            material={nodes.o.material}
            morphTargetDictionary={nodes.o.morphTargetDictionary}
            morphTargetInfluences={nodes.o.morphTargetInfluences}
            position={[-21.287, -7.107, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="w"
            castShadow
            receiveShadow
            geometry={nodes.w.geometry}
            material={nodes.w.material}
            morphTargetDictionary={nodes.w.morphTargetDictionary}
            morphTargetInfluences={nodes.w.morphTargetInfluences}
            position={[-21.287, -7.107, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="l"
            castShadow
            receiveShadow
            geometry={nodes.l.geometry}
            material={nodes.l.material}
            morphTargetDictionary={nodes.l.morphTargetDictionary}
            morphTargetInfluences={nodes.l.morphTargetInfluences}
            position={[-43.363, -12.474, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="l_1"
            castShadow
            receiveShadow
            geometry={nodes.l_1.geometry}
            material={nodes.l_1.material}
            morphTargetDictionary={nodes.l_1.morphTargetDictionary}
            morphTargetInfluences={nodes.l_1.morphTargetInfluences}
            position={[-43.363, -12.474, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="a"
            castShadow
            receiveShadow
            geometry={nodes.a.geometry}
            material={nodes.a.material}
            morphTargetDictionary={nodes.a.morphTargetDictionary}
            morphTargetInfluences={nodes.a.morphTargetInfluences}
            position={[-43.363, -12.474, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
        </group>
      </group>
    </group>
  );
};

export default WorksTitle;
