import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useState } from 'react';

import * as THREE from 'three';

import { useThree } from '@react-three/fiber';
import configs from '@/configs/titlesAnimation';
import gsap from 'gsap';

const material = new THREE.MeshBasicMaterial({ color: 0x9b9b88 });

const animatingNodes = {};

const { duration, easeEnter, easeLeave } = configs;

const AboutRecognitionTitle = ({ action }) => {
  const [widthScale, setWidthScale] = useState(1);
  const [modelDimensions, setModelDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });

  const model = useGLTF('/models/recognition.gltf');

  const { animations, nodes } = model;

  const { actions, ref, names } = useAnimations(animations);

  const three = useThree();

  const { viewport } = three;

  useEffect(() => {
    action.current = actions[names[0]];
    if (action.current) {
      action.current.reset();
      action.current.paused = true;
      action.current.play();
    }
  }, [actions, names, action]);

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
    const w = (viewport.width / modelDimensions.width) * 1.096;
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
        <group name="Null" position={[0.08, 0.007, 0]} scale={0.065}>
          <mesh
            name="n"
            castShadow
            receiveShadow
            geometry={nodes.n.geometry}
            material={material}
            morphTargetDictionary={nodes.n.morphTargetDictionary}
            morphTargetInfluences={nodes.n.morphTargetInfluences}
            position={[-23.535, -13.381, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="o"
            castShadow
            receiveShadow
            geometry={nodes.o.geometry}
            material={material}
            morphTargetDictionary={nodes.o.morphTargetDictionary}
            morphTargetInfluences={nodes.o.morphTargetInfluences}
            position={[-23.535, -13.381, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="i"
            castShadow
            receiveShadow
            geometry={nodes.i.geometry}
            material={material}
            morphTargetDictionary={nodes.i.morphTargetDictionary}
            morphTargetInfluences={nodes.i.morphTargetInfluences}
            position={[-23.535, -13.381, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="t"
            castShadow
            receiveShadow
            geometry={nodes.t.geometry}
            material={material}
            morphTargetDictionary={nodes.t.morphTargetDictionary}
            morphTargetInfluences={nodes.t.morphTargetInfluences}
            position={[-23.535, -13.381, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="i_1"
            castShadow
            receiveShadow
            geometry={nodes.i_1.geometry}
            material={material}
            morphTargetDictionary={nodes.i_1.morphTargetDictionary}
            morphTargetInfluences={nodes.i_1.morphTargetInfluences}
            position={[-23.535, -13.381, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="n_1"
            castShadow
            receiveShadow
            geometry={nodes.n_1.geometry}
            material={material}
            morphTargetDictionary={nodes.n_1.morphTargetDictionary}
            morphTargetInfluences={nodes.n_1.morphTargetInfluences}
            position={[-23.535, -13.381, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="g"
            castShadow
            receiveShadow
            geometry={nodes.g.geometry}
            material={material}
            morphTargetDictionary={nodes.g.morphTargetDictionary}
            morphTargetInfluences={nodes.g.morphTargetInfluences}
            position={[-23.535, -13.381, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="o_1"
            castShadow
            receiveShadow
            geometry={nodes.o_1.geometry}
            material={material}
            morphTargetDictionary={nodes.o_1.morphTargetDictionary}
            morphTargetInfluences={nodes.o_1.morphTargetInfluences}
            position={[-23.535, -13.381, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="c"
            castShadow
            receiveShadow
            geometry={nodes.c.geometry}
            material={material}
            morphTargetDictionary={nodes.c.morphTargetDictionary}
            morphTargetInfluences={nodes.c.morphTargetInfluences}
            position={[-23.535, -13.381, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="e"
            castShadow
            receiveShadow
            geometry={nodes.e.geometry}
            material={material}
            morphTargetDictionary={nodes.e.morphTargetDictionary}
            morphTargetInfluences={nodes.e.morphTargetInfluences}
            position={[-23.535, -13.381, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="r"
            castShadow
            receiveShadow
            geometry={nodes.r.geometry}
            material={material}
            morphTargetDictionary={nodes.r.morphTargetDictionary}
            morphTargetInfluences={nodes.r.morphTargetInfluences}
            position={[-23.535, -13.381, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
        </group>
      </group>
    </group>
  );
};

export default AboutRecognitionTitle;
