import React, { useContext, useEffect } from 'react';
import gsap from 'gsap';
import { Color } from 'three';
import { mainContext } from '@/providers/MainProvider';
import { CubeCamera, useAnimations, useGLTF } from '@react-three/drei';

const MotionObjects = ({ isHolded }) => {
  const { currentDescriptionSlide } = useContext(mainContext);

  // Fetch model and a separate texture
  const model = useGLTF('/models/03_motion_objects.gltf');
  const { scene, animations, nodes } = model;

  // Extract animation actions
  const anim = useAnimations(animations);
  const { actions, names, ref } = anim;

  useEffect(() => {
    actions[names[0]].reset().play();
    return () => actions?.[names[0]]?.stop();
  }, [actions, names]);

  // Scroll trigger animation
  useEffect(() => {
    if (isHolded !== null && currentDescriptionSlide === 2) {
      for (let i in nodes) {
        if (i === 'Null' || i === 'Null1') continue;
        gsap.to(nodes[i].scale, {
          duration: 0.5,
          x: isHolded ? 0 : 1,
          y: isHolded ? 0 : 1,
          z: isHolded ? 0 : 1,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHolded, nodes]);

  // Slide transition animation
  useEffect(() => {
    for (let i in nodes) {
      if (i === 'Null' || i === 'Null1') continue;
      gsap.to(nodes[i].scale, {
        duration: 0.5,
        delay: currentDescriptionSlide === 2 ? 0.5 : 0,
        x: currentDescriptionSlide === 2 ? 1 : 0,
        y: currentDescriptionSlide === 2 ? 1 : 0,
        z: currentDescriptionSlide === 2 ? 1 : 0,
        ease: currentDescriptionSlide === 2 ? 'power3.out' : 'power3.in',
      });
    }
  }, [currentDescriptionSlide, nodes]);

  return (
    <group
      ref={ref}
      position={[0, -0.19, 2]}
      rotation={[0, -Math.PI / 2, 0]}
      dispose={null}
    >
      <CubeCamera resolution={64} frames={Infinity}>
        {(texture) => {
          scene.traverse((child) => {
            if (child.isMesh) {
              child.material.color = new Color(0, 0, 0);
              child.material.envMap = texture;
              child.material.metalness = 1;
              child.material.roughness = 0.5;
              child.material.needsUpdate = true;
            }
          });
          return <primitive object={scene} />;
        }}
      </CubeCamera>
    </group>
  );
};

export default MotionObjects;
