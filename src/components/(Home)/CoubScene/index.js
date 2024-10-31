import {
  Helper,
  MeshReflectorMaterial,
  useAnimations,
  useGLTF,
  useHelper,
  useTexture,
  useVideoTexture,
} from '@react-three/drei';
import { useThree, extend, useFrame } from '@react-three/fiber';

// import * as postprocessing from '@react-three/postprocessing';
import {
  BrightnessContrast,
  EffectComposer as Composer,
} from '@react-three/postprocessing';
import {
  EffectComposer,
  LensDistortionEffect,
  RenderPass,
  EffectPass,
  Pass,
  BrightnessContrastEffect,
} from 'postprocessing';
import React, {
  forwardRef,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';

import { LensDistortionPassGen } from 'three-lens-distortion';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass';
import { folder, useControls } from 'leva';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import WebObjects from './WebObjects';
import BrandObjects from './BrandObjects';
import MotionObjects from './MotionObjects';
import { mainContext } from '@/providers/MainProvider';

extend({ LensDistortionEffect });

let rotationTween;
// let holdTween;
const distortion = {
  value: 0,
};

const LensDistortion = ({ isHolded }) => {
  const { gl, scene, camera } = useThree();
  const composer = useMemo(() => new EffectComposer(gl), [gl]);
  const { distortionValue, setDistortionValue } = useContext(mainContext);
  const distortionRef = useRef(0);

  // const { value } = useControls({
  //   Distortion: folder(
  //     {
  //       value: { value: 0, label: 'value', min: -1, max: 1, step: 0.01 },
  //     },
  //     { collapsed: true }
  //   ),
  // });

  useEffect(() => {
    if (isHolded) {
      gsap.to(distortionRef, {
        current: -0.25,
        duration: 1,
        // ease: 'power2.in',
        onUpdate: () => {
          setDistortionValue(distortionRef.current);
        },
      });
    } else {
      gsap.to(distortionRef, {
        current: 0,
        duration: 1,
        //ease: 'power3.out',
        onUpdate: () => setDistortionValue(distortionRef.current),
      });
    }
  }, [isHolded, setDistortionValue]);

  const distortionEffect = useMemo(
    () =>
      new LensDistortionEffect({
        distortion: new THREE.Vector2(distortionValue, distortionValue),
        focalLength: new THREE.Vector2(
          1 + distortionValue * 0.25,
          1 + distortionValue * 0.25
        ),
      }),
    [distortionValue]
  );

  const brightnessContrastEffect = useMemo(
    () => new BrightnessContrastEffect({ brightness: 0.1, contrast: 0.15 }),
    []
  );

  useEffect(() => {
    composer.removeAllPasses();
    composer.addPass(new RenderPass(scene, camera));
    if (distortionValue !== 0) {
      composer.addPass(
        new EffectPass(camera, brightnessContrastEffect, distortionEffect)
      );
    } else {
      composer.addPass(new EffectPass(camera, brightnessContrastEffect));
    }
  }, [
    brightnessContrastEffect,
    camera,
    composer,
    distortionEffect,
    distortionValue,
    scene,
  ]);

  useFrame(() => composer.render(), 2);

  return null;
};

const CoubScene = ({ cameraRef, cubeRef, currentSlide, isHolded }) => {
  const modelRef = useRef();
  const holdTweenRef = useRef();

  const material_slide_1 = useVideoTexture('/video/CUBE_01_full.mp4', {
    start: false,
    loop: false,
  });
  const material_slide_2 = useVideoTexture('/video/CUBE_02_full.mp4', {
    start: false,
    loop: false,
  });
  const material_slide_3 = useVideoTexture('/video/CUBE_03_full.mp4', {
    start: false,
    loop: false,
  });
  const material_slide_4 = useVideoTexture('/video/CUBE_04_loop.mp4');

  const material = useMemo(() => {
    const materials = [
      material_slide_1.image,
      material_slide_2.image,
      material_slide_3.image,
      material_slide_4.image,
    ];
    return materials[currentSlide];
  }, [
    currentSlide,
    material_slide_1,
    material_slide_2,
    material_slide_3,
    material_slide_4,
  ]);

  // useGSAP(
  //   () => {
  //     if (cubeRef.current) {
  //       rotationTwin = gsap.to(cubeRef.current.rotation, {
  //         y: Math.PI * 2,
  //         duration: 30,
  //         repeat: -1,
  //         ease: 'none',
  //       });
  //     }
  //   },
  //   { dependencies: [] }
  // );

  // CUBE ROTATION USED FRAME
  // useFrame(({ clock }) => {
  //   const time = clock.getElapsedTime();
  //   console.log('time', time * 0.25);

  //   if (cubeRef.current) {
  //     cubeRef.current.rotation.y = time * 0.25;
  //   }
  // });

  // useEffect(() => {
  //   const material = cubeRef.current.material?.find(
  //     (item) => item.name === 'slide_1'
  //   )?.map?.image;
  //   gsap.to(material, {
  //     currentTime: 1.0333,
  //     duration: 5,
  //   });
  // }, []);

  // const onProgress = useCallback((e) => {
  //   if (e.target.currentTime > 4.9) {
  //     e.target.currentTime = 1;
  //   }
  // }, []);

  // useEffect(() => {
  //   const material = material_slide_1.image;
  //   console.log('holdTween', holdTweenRef.current);

  //   if (isHolded) {
  //     gsap.to(cameraRef.current.position, {
  //       z: 4,
  //       duration: 1,
  //       ease: 'power2.out',
  //     });

  //     // material.play();
  //     // material.addEventListener('timeupdate', onProgress);

  //     if (holdTweenRef.current) holdTweenRef.current.kill();
  //     holdTweenRef.current = gsap.to(material_slide_1.image, {
  //       currentTime: material.duration,
  //       duration: material.duration,
  //       ease: 'none',
  //       onComplete: () => {
  //         holdTweenRef.current.repeat(-1).play(1);
  //       },
  //     });

  //     // gsap.to(slide1.image, { currentTime: 1.0333, duration: 1, ease: 'none' });
  //   } else if (isHolded === false) {
  //     //material.removeEventListener('timeupdate', onProgress);

  //     gsap.to(cameraRef.current.position, {
  //       z: 6,
  //       duration: 1,
  //       ease: 'power2.in',
  //       onComplete: () => gsap.ticker.fps(),
  //     });

  //     // material.currentTime = 5;
  //     // material.play();
  //     //gsap.to(slide1.image, { currentTime: 0, duration: 1, ease: 'none' });

  //     holdTweenRef.current?.pause().seek(1)?.reverse();
  //   }

  //   // return () => material.removeEventListener('timeupdate', onProgress);
  //   // return () => holdTween?.kill();
  // }, [cameraRef, isHolded, material_slide_1.image, onProgress]);

  useEffect(() => {
    console.log('isHolded', material.currentTime);

    if (isHolded) {
      gsap.to(cameraRef.current.position, {
        z: 4.5,
        duration: 1,
        // ease: 'power2.out',
      });

      // Material tween
      // holdTweenRef.current?.kill();
      gsap.set(material, { currentTime: 0 });
      holdTweenRef.current = gsap.to(material, {
        currentTime: material.duration,
        duration: material.duration,
        ease: 'none',
        overwrite: 'auto',
        onComplete: () => holdTweenRef.current.repeat(1).play(1.05),
        onRepeat: () => holdTweenRef.current.repeat(1).play(1.05),
      });
    }
    if (isHolded === false) {
      holdTweenRef.current?.kill();
      gsap.to(cameraRef.current?.position, {
        z: 6,
        duration: 1,
        // ease: 'power3.out',
      });

      const time =
        holdTweenRef.current?.time() < 1.02
          ? holdTweenRef.current?.time()
          : 1.02;
      holdTweenRef.current?.pause().seek(time)?.reverse();
    }
  }, [cameraRef, isHolded, material]);

  useEffect(() => {
    gsap.to(modelRef.current.rotation, {
      y: (Math.PI / 2) * currentSlide,
      duration: 1,
      ease: 'power3.inOut',
      id: 'cube-rotation',
    });
  }, [currentSlide]);

  const handleClickAndHold = useCallback(
    (e) => {
      if (e.type === 'pointerdown') {
        // Camera tween
        gsap.to(cameraRef.current.position, {
          z: 4.5,
          duration: 1,
          // ease: 'power2.out',
        });

        // Material tween
        holdTweenRef.current?.kill();
        gsap.set(material, { currentTime: 0 });
        holdTweenRef.current = gsap.to(material, {
          currentTime: material.duration,
          duration: material.duration,
          ease: 'none',
          overwrite: 'auto',
          onComplete: () => holdTweenRef.current.repeat(1).play(1.05),
          onRepeat: () => holdTweenRef.current.repeat(1).play(1.05),
        });
        // setIsHolded(true);
      }
      if (e.type === 'pointerup') {
        gsap.to(cameraRef.current.position, {
          z: 6,
          duration: 1,
          // ease: 'power3.out',
        });

        const time =
          holdTweenRef.current?.time() < 1.02
            ? holdTweenRef.current?.time()
            : 1.02;
        holdTweenRef.current?.pause().seek(time)?.reverse();
        // setIsHolded(false);
      }
    },
    [cameraRef, material]
  );

  return (
    <group>
      <group ref={modelRef} rotation={[0, 0, 0]}>
        <mesh ref={cubeRef} position={[0, 0.1, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial attach={'material-1'} map={material_slide_2} />
          <meshBasicMaterial attach={'material-4'} map={material_slide_1} />
          <meshBasicMaterial attach={'material-0'} map={material_slide_4} />

          <meshBasicMaterial attach={'material-2'} color={'#000000'} />
          <meshBasicMaterial attach={'material-3'} color={'#000000'} />

          <meshBasicMaterial attach={'material-5'} map={material_slide_3} />
        </mesh>

        <Suspense fallback={null}>
          <WebObjects isHolded={isHolded} />
        </Suspense>
        <Suspense fallback={null}>
          <BrandObjects isHolded={isHolded} />
        </Suspense>
        <Suspense fallback={null}>
          <MotionObjects isHolded={isHolded} />
        </Suspense>
      </group>
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} rotateX={-Math.PI / 2} />
        <MeshReflectorMaterial
          blur={[500, 50]}
          resolution={1024}
          mixBlur={1}
          mixStrength={100}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#161616"
          metalness={0.8}
        />
      </mesh>

      {/* <mesh
        position={[0, -1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerDown={handleClickAndHold}
        onPointerUp={handleClickAndHold}
      >
        <sphereGeometry args={[3.5, 16, 16, 0, Math.PI]} />
        <meshBasicMaterial color={'#cccccc'} wireframe />
        <planeGeometry args={[15, 10]} />
        <meshBasicMaterial transparent={true} opacity={0} />
      </mesh> */}

      {/* <Composer>
        <LensDistortion isHolded={isHolded} />
      </Composer> */}
    </group>
  );
};

export default CoubScene;
