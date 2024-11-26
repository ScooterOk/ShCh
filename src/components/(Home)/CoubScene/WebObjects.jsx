import { mainContext } from '@/providers/MainProvider';
import { useAnimations, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import React, { useContext, useEffect } from 'react';

const WebObjects = ({ isHolded }) => {
  // Fetch model and a separate texture
  const { isInit } = useContext(mainContext);
  const model = useGLTF('/models/01_web_objects.gltf');

  const { scene, animations, nodes } = model;
  // Extract animation actions
  const anim = useAnimations(animations);
  const { actions, names, ref } = anim;

  console.log('nodes', nodes);

  useEffect(() => {
    actions[names[0]].reset().play();
    return () => actions?.[names[0]]?.stop();
  }, [actions, names]);

  // Change animation when the index changes
  useEffect(() => {
    if (isHolded !== null) {
      for (let i in nodes) {
        gsap.to(nodes[i].scale, {
          duration: 1,
          x: isHolded ? 0 : 1,
          // y: isHolded ? 0 : 1,
          z: isHolded ? 0 : 1,
          // ease: 'power3.in',
        });
      }
    }
  }, [isHolded, nodes]);

  useEffect(() => {
    if (isInit) {
      for (let i in nodes) {
        gsap.to(nodes[i].scale, {
          delay: 1,
          duration: 0.5,
          x: 1,
          // y: 1,
          z: 1,
          // ease: 'power3.in',
        });
      }
    } else {
      for (let i in nodes) {
        gsap.to(nodes[i].scale, {
          delay: 1,
          duration: 0.5,
          x: 0,
          // y: 1,
          z: 0,
          // ease: 'power3.in',
        });
      }
    }
  }, [isInit, nodes]);

  return (
    <group
      ref={ref}
      dispose={null}
      position={[0, -0.5, 3]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <primitive object={scene} />
    </group>
  );
};

export default WebObjects;
