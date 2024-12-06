import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

import React, { useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import configs from '@/configs/titlesAnimation';
const { duration, easeEnter, easeLeave } = configs;
const animatingNodes = {};

const FooterTitle = ({ container }) => {
  const { isLoaded } = useContext(mainContext);
  const [widthScale, setWidthScale] = useState(1);

  const [modelDimensions, setModelDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });

  const action = useRef(null);

  const model = useGLTF('/models/lets.gltf');

  const { scene, animations, nodes } = model;

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
  }, [actions, names]);

  useGSAP(
    () => {
      if (isLoaded && action.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              end: 'bottom bottom',
            },
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
    const w = (viewport.width / modelDimensions.width) * 1.11;
    setWidthScale(w);
  }, [modelDimensions.width, viewport.width]);

  const handlePointerEnter = (e) => {
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
    // <primitive
    //   ref={ref}
    //   object={scene}
    //   position={[0, 0, 0]}
    //   scale={widthScale}
    // />
    <group ref={ref} position={[0, 0, 0]} scale={widthScale}>
      <group>
        <group name="Layer_1" position={[-0.034, 0.013, 0]} scale={0.067}>
          <mesh
            name="Fill"
            castShadow
            receiveShadow
            geometry={nodes.Fill.geometry}
            material={nodes.Fill.material}
            morphTargetDictionary={nodes.Fill.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="Fill_1"
            castShadow
            receiveShadow
            geometry={nodes.Fill_1.geometry}
            material={nodes.Fill_1.material}
            morphTargetDictionary={nodes.Fill_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_1.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="Fill_2"
            castShadow
            receiveShadow
            geometry={nodes.Fill_2.geometry}
            material={nodes.Fill_2.material}
            morphTargetDictionary={nodes.Fill_2.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_2.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="Fill_3"
            castShadow
            receiveShadow
            geometry={nodes.Fill_3.geometry}
            material={nodes.Fill_3.material}
            morphTargetDictionary={nodes.Fill_3.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_3.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="Fill_4"
            castShadow
            receiveShadow
            geometry={nodes.Fill_4.geometry}
            material={nodes.Fill_4.material}
            morphTargetDictionary={nodes.Fill_4.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_4.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="Fill_5"
            castShadow
            receiveShadow
            geometry={nodes.Fill_5.geometry}
            material={nodes.Fill_5.material}
            morphTargetDictionary={nodes.Fill_5.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_5.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="Fill_6"
            castShadow
            receiveShadow
            geometry={nodes.Fill_6.geometry}
            material={nodes.Fill_6.material}
            morphTargetDictionary={nodes.Fill_6.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_6.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="Fill_7"
            castShadow
            receiveShadow
            geometry={nodes.Fill_7.geometry}
            material={nodes.Fill_7.material}
            morphTargetDictionary={nodes.Fill_7.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_7.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="Fill_8"
            castShadow
            receiveShadow
            geometry={nodes.Fill_8.geometry}
            material={nodes.Fill_8.material}
            morphTargetDictionary={nodes.Fill_8.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_8.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="Fill_9"
            castShadow
            receiveShadow
            geometry={nodes.Fill_9.geometry}
            material={nodes.Fill_9.material}
            morphTargetDictionary={nodes.Fill_9.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_9.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="Fill_10"
            castShadow
            receiveShadow
            geometry={nodes.Fill_10.geometry}
            material={nodes.Fill_10.material}
            morphTargetDictionary={nodes.Fill_10.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_10.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
        </group>
      </group>
    </group>
  );
};

export default FooterTitle;
