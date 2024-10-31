import { mainContext } from '@/providers/MainProvider';
import { useAnimations, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import React, { useContext, useEffect, useState } from 'react';
import * as THREE from 'three';

const WebObjects = ({ isHolded }) => {
  // Fetch model and a separate texture

  const model = useGLTF('/models/01_web_objects.gltf');
  const { isInit } = useContext(mainContext);
  const { scene, animations, nodes } = model;
  // Extract animation actions
  const anim = useAnimations(animations);
  const { actions, names, ref } = anim;

  // Hover and animation-index states
  const [hovered, setHovered] = useState(false);
  const [index, setIndex] = useState(4);

  useEffect(() => {
    actions[names[0]].reset().play();
    return () => actions?.[names[0]]?.stop();
  }, [actions, names]);

  // Change animation when the index changes
  useEffect(() => {
    if (isHolded !== null) {
      for (let i in nodes) {
        gsap.to(nodes[i].scale, {
          direction: 1,
          x: isHolded ? 0 : 1,
          // y: isHolded ? 0 : 1,
          z: isHolded ? 0 : 1,
          // ease: 'power3.in',
        });
      }
    }
    // actions[names[index]].reset().fadeIn(0.5).play();
    // In the clean-up phase, fade it out
  }, [isHolded, nodes]);

  useEffect(() => {
    if (isInit) {
      for (let i in nodes) {
        gsap.to(nodes[i].scale, {
          delay: 1,
          direction: 3,
          x: 1,
          // y: 1,
          z: 1,
          // ease: 'power3.in',
        });
      }
    } else {
      for (let i in nodes) {
        nodes[i].scale.x = 0;
        // nodes[i].scale.y = 0;
        nodes[i].scale.z = 0;
      }
    }
  }, [isInit, nodes]);

  return (
    <group
      ref={ref}
      dispose={null}
      position={[0, -0.4, 3]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <primitive object={scene} />
    </group>
  );
};

export default WebObjects;
