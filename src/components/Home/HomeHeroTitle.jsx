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

const HomeHeroTitle = () => {
  const { isLoaded, setNoScroll, setIsNavigationReady } =
    useContext(mainContext);
  const [widthScale, setWidthScale] = useState(1);

  const [modelDimensions, setModelDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });

  const action = useRef(null);

  const model = useGLTF('/models/home_hero_title.gltf');

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
  }, [actions, names]);

  useGSAP(
    () => {
      if (isLoaded) {
        if (action.current) {
          gsap
            .timeline({
              onComplete: () => {
                setNoScroll(false);
                setIsNavigationReady(true);
              },
              id: 'hero-title-init',
            })
            .to(action.current, {
              time: 1,
              duration: 1,
              ease: 'power3.inOut',
            })
            .to(action.current, {
              time: 2,
              duration: 1,
              ease: 'power3.Out',
            });
        }
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
    const w = (viewport.width / modelDimensions.width) * 1.058;
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
    <group ref={ref} dispose={null} position={[0.055, 0, 0]} scale={widthScale}>
      <group>
        <group name="Null1">
          <group name="Null">
            <mesh
              name="E"
              castShadow
              receiveShadow
              geometry={nodes.E.geometry}
              material={nodes.E.material}
              morphTargetDictionary={nodes.E.morphTargetDictionary}
              morphTargetInfluences={nodes.E.morphTargetInfluences}
              position={[-0.268, 0.105, 0.042]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="C"
              castShadow
              receiveShadow
              geometry={nodes.C.geometry}
              material={nodes.C.material}
              morphTargetDictionary={nodes.C.morphTargetDictionary}
              morphTargetInfluences={nodes.C.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="N"
              castShadow
              receiveShadow
              geometry={nodes.N.geometry}
              material={nodes.N.material}
              morphTargetDictionary={nodes.N.morphTargetDictionary}
              morphTargetInfluences={nodes.N.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="E_1"
              castShadow
              receiveShadow
              geometry={nodes.E_1.geometry}
              material={nodes.E_1.material}
              morphTargetDictionary={nodes.E_1.morphTargetDictionary}
              morphTargetInfluences={nodes.E_1.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="I"
              castShadow
              receiveShadow
              geometry={nodes.I.geometry}
              material={nodes.I.material}
              morphTargetDictionary={nodes.I.morphTargetDictionary}
              morphTargetInfluences={nodes.I.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="R"
              castShadow
              receiveShadow
              geometry={nodes.R.geometry}
              material={nodes.R.material}
              morphTargetDictionary={nodes.R.morphTargetDictionary}
              morphTargetInfluences={nodes.R.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="E_2"
              castShadow
              receiveShadow
              geometry={nodes.E_2.geometry}
              material={nodes.E_2.material}
              morphTargetDictionary={nodes.E_2.morphTargetDictionary}
              morphTargetInfluences={nodes.E_2.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="P"
              castShadow
              receiveShadow
              geometry={nodes.P.geometry}
              material={nodes.P.material}
              morphTargetDictionary={nodes.P.morphTargetDictionary}
              morphTargetInfluences={nodes.P.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="X"
              castShadow
              receiveShadow
              geometry={nodes.X.geometry}
              material={nodes.X.material}
              morphTargetDictionary={nodes.X.morphTargetDictionary}
              morphTargetInfluences={nodes.X.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="E_3"
              castShadow
              receiveShadow
              geometry={nodes.E_3.geometry}
              material={nodes.E_3.material}
              morphTargetDictionary={nodes.E_3.morphTargetDictionary}
              morphTargetInfluences={nodes.E_3.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="N_1"
              castShadow
              receiveShadow
              geometry={nodes.N_1.geometry}
              material={nodes.N_1.material}
              morphTargetDictionary={nodes.N_1.morphTargetDictionary}
              morphTargetInfluences={nodes.N_1.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="G"
              castShadow
              receiveShadow
              geometry={nodes.G.geometry}
              material={nodes.G.material}
              morphTargetDictionary={nodes.G.morphTargetDictionary}
              morphTargetInfluences={nodes.G.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="I_1"
              castShadow
              receiveShadow
              geometry={nodes.I_1.geometry}
              material={nodes.I_1.material}
              morphTargetDictionary={nodes.I_1.morphTargetDictionary}
              morphTargetInfluences={nodes.I_1.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="S"
              castShadow
              receiveShadow
              geometry={nodes.S.geometry}
              material={nodes.S.material}
              morphTargetDictionary={nodes.S.morphTargetDictionary}
              morphTargetInfluences={nodes.S.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="E_4"
              castShadow
              receiveShadow
              geometry={nodes.E_4.geometry}
              material={nodes.E_4.material}
              morphTargetDictionary={nodes.E_4.morphTargetDictionary}
              morphTargetInfluences={nodes.E_4.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="D"
              castShadow
              receiveShadow
              geometry={nodes.D.geometry}
              material={nodes.D.material}
              morphTargetDictionary={nodes.D.morphTargetDictionary}
              morphTargetInfluences={nodes.D.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="L"
              castShadow
              receiveShadow
              geometry={nodes.L.geometry}
              material={nodes.L.material}
              morphTargetDictionary={nodes.L.morphTargetDictionary}
              morphTargetInfluences={nodes.L.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="A"
              castShadow
              receiveShadow
              geometry={nodes.A.geometry}
              material={nodes.A.material}
              morphTargetDictionary={nodes.A.morphTargetDictionary}
              morphTargetInfluences={nodes.A.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="T"
              castShadow
              receiveShadow
              geometry={nodes.T.geometry}
              material={nodes.T.material}
              morphTargetDictionary={nodes.T.morphTargetDictionary}
              morphTargetInfluences={nodes.T.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="I_2"
              castShadow
              receiveShadow
              geometry={nodes.I_2.geometry}
              material={nodes.I_2.material}
              morphTargetDictionary={nodes.I_2.morphTargetDictionary}
              morphTargetInfluences={nodes.I_2.morphTargetInfluences}
              position={[-0.226, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="G_1"
              castShadow
              receiveShadow
              geometry={nodes.G_1.geometry}
              material={nodes.G_1.material}
              morphTargetDictionary={nodes.G_1.morphTargetDictionary}
              morphTargetInfluences={nodes.G_1.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="I_3"
              castShadow
              receiveShadow
              geometry={nodes.I_3.geometry}
              material={nodes.I_3.material}
              morphTargetDictionary={nodes.I_3.morphTargetDictionary}
              morphTargetInfluences={nodes.I_3.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
            <mesh
              name="D_1"
              castShadow
              receiveShadow
              geometry={nodes.D_1.geometry}
              material={nodes.D_1.material}
              morphTargetDictionary={nodes.D_1.morphTargetDictionary}
              morphTargetInfluences={nodes.D_1.morphTargetInfluences}
              position={[-0.268, 0.105, 0]}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

export default HomeHeroTitle;
