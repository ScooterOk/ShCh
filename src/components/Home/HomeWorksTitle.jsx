import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

import React, { useContext, useEffect, useState } from 'react';
import * as THREE from 'three';

import configs from '@/configs/titlesAnimation';
const { duration, easeEnter, easeLeave } = configs;
const animatingNodes = {};

const HomeWorksTitle = ({ container }) => {
  const { isLoaded, loadedMedia } = useContext(mainContext);
  const [widthScale, setWidthScale] = useState(1);

  const [modelDimensions, setModelDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });

  // const { value } = useControls({
  //   lerpLookAt: folder(
  //     {
  //       value: { value: 0, label: "value", min: 0, max: 2 },
  //     },
  //     { collapsed: true }
  //   ),
  // });

  const [action, setAction] = useState(null);

  const model = useGLTF(loadedMedia['/models/works.gltf']);

  const { animations, nodes } = model;

  const { actions, ref, names } = useAnimations(animations);

  const three = useThree();

  const { viewport } = three;

  useEffect(() => {
    const a = actions[names[0]];
    a.reset();
    a.paused = true;
    a.play();
    setAction(a);
  }, [actions, names]);

  useGSAP(
    () => {
      if (isLoaded && action) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              start: '-=10% 80%',
              end: 'bottom bottom',
            },
            id: 'works-title_init',
          })
          .to(action, {
            time: 0.5,
            duration: 1,
            ease: 'power3.inOut',
          })
          .to(action, {
            time: 1.5,
            duration: 1,
            ease: 'power3.Out',
          });
      }
    },
    { dependencies: [isLoaded, action] }
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
    const w = (viewport.width / modelDimensions.width) * 1.075;
    setWidthScale(w);
  }, [modelDimensions.width, viewport.width]);

  const handlePointerEnter = (e) => {
    if (gsap.getById('works-title_init')?.isActive()) return;

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
    if (gsap.getById('works-title_init')?.isActive()) return;

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
    <group ref={ref} dispose={null} position={[0, 0, 0]} scale={widthScale}>
      <group>
        <group name="Layer_1" position={[0.114, 0.001, 0]} scale={0.055}>
          <mesh
            name="S"
            castShadow
            receiveShadow
            geometry={nodes.S.geometry}
            material={nodes.S.material}
            morphTargetDictionary={nodes.S.morphTargetDictionary}
            morphTargetInfluences={nodes.S.morphTargetInfluences}
            position={[-24.633, -14.302, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="K"
            castShadow
            receiveShadow
            geometry={nodes.K.geometry}
            material={nodes.K.material}
            morphTargetDictionary={nodes.K.morphTargetDictionary}
            morphTargetInfluences={nodes.K.morphTargetInfluences}
            position={[-24.633, -14.302, 0]}
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
            position={[-24.633, -14.302, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="O"
            castShadow
            receiveShadow
            geometry={nodes.O.geometry}
            material={nodes.O.material}
            morphTargetDictionary={nodes.O.morphTargetDictionary}
            morphTargetInfluences={nodes.O.morphTargetInfluences}
            position={[-24.633, -14.302, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
          <mesh
            name="W"
            castShadow
            receiveShadow
            geometry={nodes.W.geometry}
            material={nodes.W.material}
            morphTargetDictionary={nodes.W.morphTargetDictionary}
            morphTargetInfluences={nodes.W.morphTargetInfluences}
            position={[-24.633, -14.302, 0]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
        </group>
      </group>
    </group>
  );
};

export default HomeWorksTitle;
