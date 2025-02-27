import React, { useContext, useEffect } from 'react';
import { mainContext } from '@/providers/MainProvider';
import { CubeCamera, useAnimations, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { Color } from 'three';

const BrandObjects = ({ isHolded }) => {
  const { currentFocusSlide, loadedMedia } = useContext(mainContext);

  // Fetch model and a separate texture
  const model = useGLTF(loadedMedia['/models/02_brand_objects.gltf']);

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
    if (isHolded !== null && currentFocusSlide === 1) {
      for (let i in nodes) {
        if (i === 'Null3' || i === 'Null4') continue;
        gsap.to(nodes[i].scale, {
          duration: 0.5,
          x: isHolded ? 0 : 1,
          y: isHolded ? 0 : 1,
          z: isHolded ? 0 : 1,
          // ease: isHolded ? 'power3.in' : 'power3.out',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHolded, nodes]);

  // Slide transition animation
  useEffect(() => {
    for (let i in nodes) {
      if (i === 'Null3' || i === 'Null4') continue;
      gsap.to(nodes[i].scale, {
        duration: 0.5,
        delay: currentFocusSlide === 1 ? 0.5 : 0,
        x: currentFocusSlide === 1 ? 1 : 0,
        y: currentFocusSlide === 1 ? 1 : 0,
        z: currentFocusSlide === 1 ? 1 : 0,
        ease: currentFocusSlide === 1 ? 'power3.out' : 'power3.in',
      });
    }
  }, [currentFocusSlide, nodes]);

  return (
    <group
      ref={ref}
      position={[0, -0.45, 1.35]}
      rotation={[0, -Math.PI / 2, 0]}
      dispose={null}
      scale={1.1}
    >
      <CubeCamera resolution={512} frames={Infinity}>
        {(texture) => {
          scene.traverse((child) => {
            if (child.isMesh) {
              child.material.color = new Color(0, 0, 0);
              child.material.envMap = texture;
              child.material.metalness = 1;
              child.material.roughness = 0.65;
              child.material.needsUpdate = true;
            }
          });
          return <primitive object={scene} />;
        }}
      </CubeCamera>
    </group>
  );
};

export default BrandObjects;
