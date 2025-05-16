import gsap from 'gsap';
import React, { forwardRef, useEffect, useMemo, useRef } from 'react';

import * as THREE from 'three';

let material_slide_1, material_slide_2, material_slide_4;

const Coub = forwardRef((props, ref) => {
  const { isHolded, currentSlide, cameraRef } = props;
  const holdTweenRef = useRef();
  const videoTimeRef = useRef(0);
  const handleOnHoldedRef = useRef();

  if (!material_slide_1) {
    const video = document.getElementById('material_slide_1');
    material_slide_1 = new THREE.VideoTexture(video);
  }

  if (!material_slide_2) {
    const video = document.getElementById('material_slide_2');
    video.currentTime = video.duration;
    material_slide_2 = new THREE.VideoTexture(video);
  }

  if (!material_slide_4) {
    const video = document.getElementById('material_slide_4');
    material_slide_4 = new THREE.VideoTexture(video);
  }

  const material = useMemo(() => {
    const materials = [
      material_slide_1.image,
      material_slide_2.image,
      material_slide_4.image,
      material_slide_4.image,
    ];
    if (currentSlide < 0) return materials[0];
    if (currentSlide > materials.length - 1)
      return materials[materials.length - 1];
    return materials[currentSlide];
  }, [currentSlide]);

  const handleOnHolded = React.useCallback(
    (isHolded) => {
      if (isHolded) {
        gsap.to(cameraRef.current.position, {
          z: 4,
          duration: 1,
          // ease: 'power2.out',
        });

        // Material tween
        holdTweenRef.current?.kill();

        gsap.set(material, { currentTime: 0 });
        material.play();
        holdTweenRef.current = gsap
          .timeline()
          .to(videoTimeRef, {
            current: material.duration - 1,
            duration: material.duration - 1,
            ease: 'none',
          })
          .add(() => (material.currentTime = 1))
          .set(videoTimeRef, { current: 1 })
          .to(videoTimeRef, {
            current: material.duration - 2,
            duration: material.duration - 2,
            ease: 'none',
            repeat: -1,
            onRepeat: () => (material.currentTime = 1),
          });
      }
      if (isHolded === false) {
        holdTweenRef?.current?.kill();

        const time =
          material?.currentTime < 1
            ? material.duration - material.currentTime
            : 5.5;
        material.currentTime = !isNaN(time) ? time : 0.5;
        gsap.to(cameraRef.current?.position, {
          z: 4.5,
          duration: 1,
          // ease: 'power3.out',
        });
      }
    },
    [cameraRef, material, videoTimeRef, holdTweenRef]
  );

  useEffect(() => {
    handleOnHoldedRef.current = handleOnHolded;
  }, [handleOnHolded]);

  useEffect(() => {
    handleOnHoldedRef.current(isHolded);
  }, [isHolded]);

  return (
    <mesh
      ref={ref}
      position={[0, 0.1, 0]}
      rotation={[0, Math.PI * 2 + Math.PI / 2, 0]}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial attach={'material-0'} map={material_slide_2} />
      <meshBasicMaterial attach={'material-4'} map={material_slide_1} />
      <meshBasicMaterial attach={'material-1'} map={material_slide_4} />
      <meshBasicMaterial attach={'material-2'} color={'#000000'} />
      <meshBasicMaterial attach={'material-3'} color={'#000000'} />
      <meshBasicMaterial attach={'material-5'} map={material_slide_4} />
    </mesh>
  );
});

Coub.displayName = 'Coub';

export default Coub;
