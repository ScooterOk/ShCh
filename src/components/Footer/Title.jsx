import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';

import React, { useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const FooterTitle = ({ container }) => {
  const { isLoaded } = useContext(mainContext);
  const [widthScale, setWidthScale] = useState(1);

  const [modelDimensions, setModelDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });

  const action = useRef(null);

  const model = useGLTF('/models/lets.gltf');

  const { scene, animations } = model;

  const { actions, ref, names } = useAnimations(animations);

  const three = useThree();

  const { viewport } = three;

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
              start: 'top 80%',
              end: 'bottom bottom',
            },
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
    const w = (viewport.width / modelDimensions.width) * 1.11;
    setWidthScale(w);
  }, [modelDimensions.width, viewport.width]);

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[0, 0, 0]}
      scale={widthScale}
    />
  );
};

export default FooterTitle;
