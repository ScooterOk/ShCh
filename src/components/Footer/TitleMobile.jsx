import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

import React, { useContext, useEffect, useState } from 'react';
import * as THREE from 'three';

const FooterTitleMobile = ({ container, titleColor }) => {
  const { isLoaded, loadedMedia } = useContext(mainContext);
  const [widthScale, setWidthScale] = useState(1);

  const material = titleColor
    ? new THREE.MeshBasicMaterial({ color: titleColor })
    : null;

  const [modelDimensions, setModelDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });

  const [action, setAction] = useState(null);

  const model = useGLTF(loadedMedia?.['/models/lets.gltf']);

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
    // action.current = actions[names[0]];
    // if (action.current) {
    //   action.current.reset();
    //   action.current.paused = true;
    //   action.current.play();
    // }
  }, [actions, names]);

  useGSAP(
    () => {
      if (isLoaded && action) {
        gsap
          .timeline({
            id: 'footer-title-init',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              end: 'bottom bottom',
            },
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
    const w = (viewport.width / modelDimensions.width) * 1.14;
    setWidthScale(w);
  }, [modelDimensions.width, viewport.width]);

  // const handlePointerEnter = (e) => {
  //   if (gsap.getById('footer-title-init')?.isActive()) return;

  //   const target = e.eventObject.morphTargetInfluences;
  //   const name = e.eventObject.name;
  //   if (animatingNodes?.[name]?.isActive()) animatingNodes?.[name].kill();
  //   animatingNodes[name] = gsap.to(target, {
  //     [0]: 1,
  //     duration,
  //     ease: easeEnter,
  //     overwrite: true,
  //   });
  // };

  // const handlePointerLeave = (e) => {
  //   if (gsap.getById('footer-title-init')?.isActive()) return;

  //   const target = e.eventObject.morphTargetInfluences;
  //   const name = e.eventObject.name;
  //   if (!animatingNodes?.[name]?.isActive()) {
  //     gsap.to(target, {
  //       [0]: 0,
  //       duration,
  //       ease: 'power2.inOut',
  //       overwrite: 'auto',
  //     });
  //   } else {
  //     animatingNodes?.[name].eventCallback('onComplete', () => {
  //       gsap.to(target, {
  //         [0]: 0,
  //         duration,
  //         ease: easeLeave,
  //       });
  //     });
  //   }
  // };

  return (
    // <primitive
    //   ref={ref}
    //   object={scene}
    //   position={[0, 0, 0]}
    //   scale={widthScale}
    // />
    <group ref={ref} position={[1.0, 0.42, 0]} scale={widthScale}>
      <group>
        <group name="Layer_1">
          <mesh
            name="Fill"
            castShadow
            receiveShadow
            geometry={nodes.Fill.geometry}
            material={material ? material : nodes.Fill.material}
            morphTargetDictionary={nodes.Fill.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill.morphTargetInfluences}
            position={[-36.693, -17.803, 0]}
          />
          <mesh
            name="Fill_1"
            castShadow
            receiveShadow
            geometry={nodes.Fill_1.geometry}
            material={material ? material : nodes.Fill_1.material}
            morphTargetDictionary={nodes.Fill_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_1.morphTargetInfluences}
            position={[-36.693, -17.803, 0]}
          />
          <mesh
            name="Fill_2"
            castShadow
            receiveShadow
            geometry={nodes.Fill_2.geometry}
            material={material ? material : nodes.Fill_2.material}
            morphTargetDictionary={nodes.Fill_2.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_2.morphTargetInfluences}
            position={[-36.693, -17.803, 0]}
          />
          <mesh
            name="Fill_3"
            castShadow
            receiveShadow
            geometry={nodes.Fill_3.geometry}
            material={material ? material : nodes.Fill_3.material}
            morphTargetDictionary={nodes.Fill_3.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_3.morphTargetInfluences}
            position={[-36.693, -17.803, 0]}
          />
          <mesh
            name="Fill_4"
            castShadow
            receiveShadow
            geometry={nodes.Fill_4.geometry}
            material={nodes.Fill_4.material}
            morphTargetDictionary={nodes.Fill_4.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_4.morphTargetInfluences}
            position={[-36.693, -17.803, 0]}
          />
          <mesh
            name="Fill_5"
            castShadow
            receiveShadow
            geometry={nodes.Fill_5.geometry}
            material={material ? material : nodes.Fill_5.material}
            morphTargetDictionary={nodes.Fill_5.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_5.morphTargetInfluences}
            position={[-36.693, -17.803, 0]}
          />
          <mesh
            name="Fill_6"
            castShadow
            receiveShadow
            geometry={nodes.Fill_6.geometry}
            material={material ? material : nodes.Fill_6.material}
            morphTargetDictionary={nodes.Fill_6.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_6.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
          />
          <mesh
            name="Fill_7"
            castShadow
            receiveShadow
            geometry={nodes.Fill_7.geometry}
            material={material ? material : nodes.Fill_7.material}
            morphTargetDictionary={nodes.Fill_7.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_7.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
          />
          <mesh
            name="Fill_8"
            castShadow
            receiveShadow
            geometry={nodes.Fill_8.geometry}
            material={material ? material : nodes.Fill_8.material}
            morphTargetDictionary={nodes.Fill_8.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_8.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
          />
          <mesh
            name="Fill_9"
            castShadow
            receiveShadow
            geometry={nodes.Fill_9.geometry}
            material={material ? material : nodes.Fill_9.material}
            morphTargetDictionary={nodes.Fill_9.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_9.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
          />
          <mesh
            name="Fill_10"
            castShadow
            receiveShadow
            geometry={nodes.Fill_10.geometry}
            material={material ? material : nodes.Fill_10.material}
            morphTargetDictionary={nodes.Fill_10.morphTargetDictionary}
            morphTargetInfluences={nodes.Fill_10.morphTargetInfluences}
            position={[-23.21, -13.025, 0]}
          />
        </group>
      </group>
    </group>
  );
};

export default FooterTitleMobile;
