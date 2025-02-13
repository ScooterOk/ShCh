import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';
import { useAnimations, useGLTF, useVideoTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

import React, { useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import configs from '@/configs/titlesAnimation';

const { duration, easeEnter, easeLeave } = configs;
const animatingNodes = {};

const HomeAllWorksTitleMobile = ({ container }) => {
  const { isLoaded, loadedVideos } = useContext(mainContext);
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

  const action = useRef(null);

  const model = useGLTF('/models/viewall_mobile.gltf');

  const { animations, nodes } = model;

  const { actions, ref, names } = useAnimations(animations);

  const three = useThree();

  const { viewport } = three;

  const videoMaterial = useVideoTexture(loadedVideos?.['/video/allworks.mp4'], {
    start: true,
    // loop: true,
  });

  const fillMaterial = new THREE.MeshBasicMaterial({
    map: videoMaterial,
  });

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
              start: '-=10% 80%',
              end: 'bottom bottom',
            },
            id: 'allworks-title_init',
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
    const w = (viewport.width / modelDimensions.width) * 1.08;
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
    <group
      ref={ref}
      dispose={null}
      position={[0.925, 0.215, 0]}
      scale={widthScale}
    >
      <group>
        <group name="Layer_1" position={[0.084, 0.021, 0]} scale={0.059}>
          <mesh
            name="s"
            castShadow
            receiveShadow
            geometry={nodes.s.geometry}
            material={nodes.s.material}
            morphTargetDictionary={nodes.s.morphTargetDictionary}
            morphTargetInfluences={nodes.s.morphTargetInfluences}
            position={[-35.555, -16.394, 0]}
          />
          <mesh
            name="k"
            castShadow
            receiveShadow
            geometry={nodes.k.geometry}
            material={nodes.k.material}
            morphTargetDictionary={nodes.k.morphTargetDictionary}
            morphTargetInfluences={nodes.k.morphTargetInfluences}
            position={[-35.555, -16.394, 0]}
          />
          <mesh
            name="r"
            castShadow
            receiveShadow
            geometry={nodes.r.geometry}
            material={nodes.r.material}
            morphTargetDictionary={nodes.r.morphTargetDictionary}
            morphTargetInfluences={nodes.r.morphTargetInfluences}
            position={[-35.555, -16.394, 0]}
          />
          <mesh
            name="o"
            castShadow
            receiveShadow
            geometry={nodes.o.geometry}
            material={nodes.o.material}
            morphTargetDictionary={nodes.o.morphTargetDictionary}
            morphTargetInfluences={nodes.o.morphTargetInfluences}
            position={[-35.555, -16.394, 0]}
          />
          <mesh
            name="w"
            castShadow
            receiveShadow
            geometry={nodes.w.geometry}
            material={nodes.w.material}
            morphTargetDictionary={nodes.w.morphTargetDictionary}
            morphTargetInfluences={nodes.w.morphTargetInfluences}
            position={[-35.555, -16.394, 0]}
          />
          <mesh
            name="l"
            castShadow
            receiveShadow
            geometry={nodes.l.geometry}
            material={nodes.l.material}
            morphTargetDictionary={nodes.l.morphTargetDictionary}
            morphTargetInfluences={nodes.l.morphTargetInfluences}
            position={[-34.224, -17.106, 0]}
          />
          <mesh
            name="l_1"
            castShadow
            receiveShadow
            geometry={nodes.l_1.geometry}
            material={nodes.l_1.material}
            morphTargetDictionary={nodes.l_1.morphTargetDictionary}
            morphTargetInfluences={nodes.l_1.morphTargetInfluences}
            position={[-34.224, -17.106, 0]}
          />
          <mesh
            name="a"
            castShadow
            receiveShadow
            geometry={nodes.a.geometry}
            material={nodes.a.material}
            morphTargetDictionary={nodes.a.morphTargetDictionary}
            morphTargetInfluences={nodes.a.morphTargetInfluences}
            position={[-34.224, -17.106, 0]}
          />
          <mesh
            name="Fill"
            castShadow
            receiveShadow
            geometry={nodes.Fill.geometry}
            material={fillMaterial}
            morphTargetDictionary={nodes.Fill.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill.morphTargetInfluences}
            position={[-22.925, -8.362, 0]}
          />
          <mesh
            name="w_1"
            castShadow
            receiveShadow
            geometry={nodes.w_1.geometry}
            material={nodes.w_1.material}
            morphTargetDictionary={nodes.w_1.morphTargetDictionary}
            morphTargetInfluences={nodes.w_1.morphTargetInfluences}
            position={[-23.077, -12.474, 0]}
          />
          <mesh
            name="e"
            castShadow
            receiveShadow
            geometry={nodes.e.geometry}
            material={nodes.e.material}
            morphTargetDictionary={nodes.e.morphTargetDictionary}
            morphTargetInfluences={nodes.e.morphTargetInfluences}
            position={[-23.077, -12.474, 0]}
          />
          <mesh
            name="i"
            castShadow
            receiveShadow
            geometry={nodes.i.geometry}
            material={nodes.i.material}
            morphTargetDictionary={nodes.i.morphTargetDictionary}
            morphTargetInfluences={nodes.i.morphTargetInfluences}
            position={[-23.077, -12.474, 0]}
          />
          <mesh
            name="v"
            castShadow
            receiveShadow
            geometry={nodes.v.geometry}
            material={nodes.v.material}
            morphTargetDictionary={nodes.v.morphTargetDictionary}
            morphTargetInfluences={nodes.v.morphTargetInfluences}
            position={[-23.077, -12.474, 0]}
          />
        </group>
      </group>
    </group>
  );
};

export default HomeAllWorksTitleMobile;
