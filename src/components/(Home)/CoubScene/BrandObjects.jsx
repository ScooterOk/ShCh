import { useAnimations, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import React, { useEffect, useState } from 'react';

const BrandObjects = ({ isHolded }) => {
  // Fetch model and a separate texture

  // const model = useGLTF('/models/02_brand_objects.gltf');
  const model = useGLTF('/models/test_pbr_02_brand_objects.gltf');

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
    if (isHolded) {
      gsap.to(ref.current.scale, {
        direction: 1,
        x: 3,
        y: 3,
        z: 3,
        //ease: 'power3.out',
      });
    } else {
      gsap.to(ref.current.scale, {
        direction: 1,
        x: 1,
        y: 1,
        z: 1,
        //ease: 'power3.out',
      });
    }

    // actions[names[index]].reset().fadeIn(0.5).play();
    // In the clean-up phase, fade it out
  }, [isHolded, ref]);

  return (
    <group
      ref={ref}
      dispose={null}
      position={[-1, -0.4, 0]}
      rotation={[0, -Math.PI, 0]}
    >
      <primitive object={scene} />
    </group>
  );
};

export default BrandObjects;
