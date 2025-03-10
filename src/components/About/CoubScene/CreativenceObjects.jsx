import React, { useContext, useEffect } from 'react';
import gsap from 'gsap';
import { Color } from 'three';
import { CubeCamera, useAnimations, useGLTF } from '@react-three/drei';

import { mainContext } from '@/providers/MainProvider';

const CreativenceObjects = ({ isHolded }) => {
  // Fetch model and a separate texture
  const { currentDescriptionSlide, loadedMedia } = useContext(mainContext);
  const model = useGLTF(loadedMedia['/models/about_creativence.gltf']);

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
    if (isHolded !== null && currentDescriptionSlide === 0) {
      for (let i in nodes) {
        if (
          i === 'sceneWEB' ||
          i === 'sceneWEB1' ||
          i === 'sceneWEB2' ||
          i === 'sceneWEB3' ||
          i === 'Cube'
        )
          continue;
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
      if (
        i === 'sceneWEB' ||
        i === 'sceneWEB1' ||
        i === 'sceneWEB2' ||
        i === 'sceneWEB3' ||
        i === 'Cube'
      )
        continue;
      gsap.to(nodes[i].scale, {
        duration: 0.5,
        delay: currentDescriptionSlide === 0 ? 0.5 : 0,
        x: currentDescriptionSlide === 0 ? 1 : 0,
        y: currentDescriptionSlide === 0 ? 1 : 0,
        z: currentDescriptionSlide === 0 ? 1 : 0,
        ease: currentDescriptionSlide === 0 ? 'power3.out' : 'power3.in',
      });
    }
  }, [currentDescriptionSlide, nodes]);

  // Init animation
  // useEffect(() => {
  //   if (isInit) {
  //     for (let i in nodes) {
  //       gsap.to(nodes[i].scale, {
  //         delay: 1,
  //         duration: 0.5,
  //         x: 1,
  //         y: 1,
  //         z: 1,
  //         // ease: 'power3.in',
  //       });
  //     }
  //   } else {
  //     for (let i in nodes) {
  //       gsap.to(nodes[i].scale, {
  //         delay: 1,
  //         duration: 0.5,
  //         x: 0,
  //         y: 1,
  //         z: 0,
  //         // ease: 'power3.in',
  //       });
  //     }
  //   }
  // }, [isInit, nodes]);

  return (
    <group
      ref={ref}
      position={[0, -0.3, 2.7]}
      rotation={[0, -Math.PI / 2, 0]}
      scale={0.7}
    >
      <CubeCamera resolution={512} frames={Infinity}>
        {(texture) => {
          scene.traverse((child) => {
            if (child.isMesh) {
              child.material.color = new Color(0, 0, 0);
              child.material.envMap = texture;
              child.material.metalness = 0; // Металічність
              child.material.roughness = 1; // Гладкість
              child.material.needsUpdate = true;
            }
          });
          return <primitive object={scene} />;
        }}
      </CubeCamera>
    </group>
  );
};

export default CreativenceObjects;
