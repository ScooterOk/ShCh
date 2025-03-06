import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useContext, useEffect, useState } from 'react';

import * as THREE from 'three';

import { useThree } from '@react-three/fiber';
import configs from '@/configs/titlesAnimation';
import gsap from 'gsap';
import { mainContext } from '@/providers/MainProvider';

const animatingNodes = {};

const { duration, easeEnter, easeLeave } = configs;

const material = new THREE.MeshBasicMaterial({ color: 0x9b9b88 });

const NextWorkTitle = ({ setAction }) => {
  const [widthScale, setWidthScale] = useState(1);
  const [modelDimensions, setModelDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });

  const { loadedMedia } = useContext(mainContext);

  const model = useGLTF(loadedMedia['/models/next_work.gltf']);

  const { animations, nodes } = model;

  const { actions, ref, names } = useAnimations(animations);

  const three = useThree();

  const { viewport } = three;

  // useEffect(() => {
  //   const action = actions[names[0]];
  //   action.reset();
  //   action.paused = true;
  //   action.play();
  //   setAction(actions[names[0]]);
  // }, [actions, names, setAction]);

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
    const w = (viewport.width / modelDimensions.width) * 1.15;
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
    <group
      ref={ref}
      dispose={null}
      position={[-0.125, 0.045, 0]}
      scale={widthScale}
    >
      <group>
        <group name="Layer_1">
          <mesh
            name="line1"
            castShadow
            receiveShadow
            geometry={nodes.line1.geometry}
            // material={nodes.line1.material}
            material={material}
            position={[-0.403, -1.045, 0]}
            scale={0.059}
          />
          <mesh
            name="line"
            castShadow
            receiveShadow
            geometry={nodes.line.geometry}
            // material={nodes.line.material}
            material={material}
            position={[-0.726, -0.729, 0]}
            scale={0.059}
          />
          <mesh
            name="K"
            castShadow
            receiveShadow
            geometry={nodes.K.geometry}
            // material={nodes.K.material}
            material={material}
            morphTargetDictionary={nodes.K.morphTargetDictionary}
            morphTargetInfluences={nodes.K.morphTargetInfluences}
            position={[-0.888, -0.518, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="R"
            castShadow
            receiveShadow
            geometry={nodes.R.geometry}
            // material={nodes.R.material}
            material={material}
            morphTargetDictionary={nodes.R.morphTargetDictionary}
            morphTargetInfluences={nodes.R.morphTargetInfluences}
            position={[-0.888, -0.518, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="O"
            castShadow
            receiveShadow
            geometry={nodes.O.geometry}
            // material={nodes.O.material}
            material={material}
            morphTargetDictionary={nodes.O.morphTargetDictionary}
            morphTargetInfluences={nodes.O.morphTargetInfluences}
            position={[-0.888, -0.518, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="W"
            castShadow
            receiveShadow
            geometry={nodes.W.geometry}
            // material={nodes.W.material}
            material={material}
            morphTargetDictionary={nodes.W.morphTargetDictionary}
            morphTargetInfluences={nodes.W.morphTargetInfluences}
            position={[-0.888, -0.518, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="T"
            castShadow
            receiveShadow
            geometry={nodes.T.geometry}
            // material={nodes.T.material}
            material={material}
            morphTargetDictionary={nodes.T.morphTargetDictionary}
            morphTargetInfluences={nodes.T.morphTargetInfluences}
            position={[-0.888, -0.512, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="X"
            castShadow
            receiveShadow
            geometry={nodes.X.geometry}
            // material={nodes.X.material}
            material={material}
            morphTargetDictionary={nodes.X.morphTargetDictionary}
            morphTargetInfluences={nodes.X.morphTargetInfluences}
            position={[-0.888, -0.512, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="E"
            castShadow
            receiveShadow
            geometry={nodes.E.geometry}
            // material={nodes.E.material}
            material={material}
            morphTargetDictionary={nodes.E.morphTargetDictionary}
            morphTargetInfluences={nodes.E.morphTargetInfluences}
            position={[-0.888, -0.512, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="N"
            castShadow
            receiveShadow
            geometry={nodes.N.geometry}
            // material={nodes.N.material}
            material={material}
            morphTargetDictionary={nodes.N.morphTargetDictionary}
            morphTargetInfluences={nodes.N.morphTargetInfluences}
            position={[-0.888, -0.512, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
        </group>
      </group>
    </group>
  );
};

export default NextWorkTitle;
