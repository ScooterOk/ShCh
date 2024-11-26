import { useAnimations, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import React, { useEffect, useState } from 'react';

const BrandObjects = ({ isHolded }) => {
  // Fetch model and a separate texture

  // const model = useGLTF('/models/02_brand_objects.gltf');
  const model = useGLTF('/models/02_brand_objects2.gltf');

  const { scene, animations, nodes } = model;

  // Extract animation actions
  const anim = useAnimations(animations);
  const { actions, names, ref } = anim;

  useEffect(() => {
    actions[names[0]].reset().play();
    return () => actions?.[names[0]]?.stop();
  }, [actions, names]);

  // Change animation when the index changes
  // useEffect(() => {
  //   if (isHolded) {
  //     gsap.to(ref.current.scale, {
  //       direction: 1,
  //       x: 3,
  //       y: 3,
  //       z: 3,
  //       //ease: 'power3.out',
  //     });
  //   } else {
  //     gsap.to(ref.current.scale, {
  //       direction: 1,
  //       x: 1,
  //       y: 1,
  //       z: 1,
  //       //ease: 'power3.out',
  //     });
  //   }

  //   // actions[names[index]].reset().fadeIn(0.5).play();
  //   // In the clean-up phase, fade it out
  // }, [isHolded, ref]);

  useEffect(() => {
    if (isHolded !== null) {
      for (let i in nodes) {
        gsap.to(nodes[i].scale, {
          duration: 1,
          x: isHolded ? 0 : 1,
          y: isHolded ? 0 : 1,
          z: isHolded ? 0 : 1,
          // ease: 'power3.in',
        });
      }
    }
  }, [isHolded, nodes]);

  return (
    <group
      ref={ref}
      dispose={null}
      position={[2.8, -0.5, 0]}
      rotation={[0, 0, 0]}
    >
      <primitive object={scene} />
    </group>
  );
};

export default BrandObjects;
