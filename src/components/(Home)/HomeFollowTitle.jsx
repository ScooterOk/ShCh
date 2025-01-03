import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

import React, { useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const material = new THREE.MeshBasicMaterial({ color: 0x9b9b88 });
import configs from '@/configs/titlesAnimation';
const { duration, easeEnter, easeLeave } = configs;
const animatingNodes = {};

const HomeFollowTitle = ({ container }) => {
  const { isLoaded } = useContext(mainContext);
  const [widthScale, setWidthScale] = useState(1);

  const [modelDimensions, setModelDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });

  const action = useRef(null);

  const model = useGLTF('/models/follow.gltf');

  const { animations, materials, nodes } = model;

  const { actions, ref, names } = useAnimations(animations);

  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        material.color.set(155, 155, 136);
      });
    }
  }, [materials]);

  const three = useThree();

  const { viewport } = three;

  useEffect(() => {
    action.current = actions[names[0]];
    if (action.current) {
      action.current.reset();
      action.current.paused = true;
      action.current.play();
    }
  }, [actions, names]);

  useGSAP(
    () => {
      if (isLoaded && action.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top 50%',
              end: 'bottom bottom',
            },
            id: 'follow-title-init',
          })
          .to(action.current, {
            time: 0.5,
            duration: 1,
            ease: 'power3.inOut',
          })
          .to(action.current, {
            time: 1.5,
            duration: 1,
            ease: 'power3.Out',
          });
      }
    },
    { dependencies: [isLoaded] }
  );

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
    const w = (viewport.width / modelDimensions.width) * 1.127;
    setWidthScale(w);
  }, [modelDimensions.width, viewport.width]);

  const handlePointerEnter = (e) => {
    if (gsap.getById('follow-title-init')?.isActive()) return;

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
    if (gsap.getById('follow-title-init')?.isActive()) return;

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
        <group name="Layer_1" position={[-0.109, -0.013, 0]} scale={0.067}>
          <mesh
            name="w"
            castShadow
            receiveShadow
            geometry={nodes.w.geometry}
            material={material}
            morphTargetDictionary={nodes.w.morphTargetDictionary}
            morphTargetInfluences={nodes.w.morphTargetInfluences}
            position={[-17.071, -12.008, 0]}
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
            position={[-17.071, -12.008, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="l"
            castShadow
            receiveShadow
            geometry={nodes.l.geometry}
            material={material}
            morphTargetDictionary={nodes.l.morphTargetDictionary}
            morphTargetInfluences={nodes.l.morphTargetInfluences}
            position={[-17.071, -12.008, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="l_1"
            castShadow
            receiveShadow
            geometry={nodes.l_1.geometry}
            material={material}
            morphTargetDictionary={nodes.l_1.morphTargetDictionary}
            morphTargetInfluences={nodes.l_1.morphTargetInfluences}
            position={[-17.071, -12.008, 0]}
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
            position={[-17.071, -12.008, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="f"
            castShadow
            receiveShadow
            geometry={nodes.f.geometry}
            material={material}
            morphTargetDictionary={nodes.f.morphTargetDictionary}
            morphTargetInfluences={nodes.f.morphTargetInfluences}
            position={[-17.071, -12.008, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
        </group>
      </group>
    </group>
  );
};

export default HomeFollowTitle;
