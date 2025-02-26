import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import React, { useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import configs from '@/configs/titlesAnimation';

const animatingNodes = {};

const { duration, easeEnter, easeLeave } = configs;

const AboutHeroTitleMobile = () => {
  const [widthScale, setWidthScale] = useState(1);
  const [modelDimensions, setModelDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });

  const [action, setAction] = useState(null);

  const { isLoaded, loadedMedia } = useContext(mainContext);

  const model = useGLTF(
    loadedMedia['/models/about_digital_art_director_mob.gltf']
  );

  const { animations, nodes } = model;
  const material = new THREE.MeshBasicMaterial({ color: 0x9b9b88 });

  const { actions, ref, names } = useAnimations(animations);

  const three = useThree();

  const { viewport } = three;

  useEffect(() => {
    const a = actions[names[0]];
    a.reset();
    a.paused = true;
    a.play();
    setAction(a);
  }, [actions, names]);

  useGSAP(
    () => {
      if (isLoaded && action) {
        gsap
          .timeline({
            //   onComplete: () => setNoScroll(false),
            id: 'hero-title-init',
          })
          .to(action, {
            time: 0.5,
            duration: 1,
            ease: 'power3.inOut',
          })
          .to(action, {
            time: 1.5,
            duration: 1,
            ease: 'power3.Out',
          });
      }
    },
    { dependencies: [isLoaded, action] }
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
    const w = (viewport.width / modelDimensions.width) * 1.165;
    setWidthScale(w);
  }, [modelDimensions.width, viewport.width]);

  return (
    <group ref={ref} dispose={null} position={[1, 0, 0]} scale={widthScale}>
      <group>
        <group name="Null" position={[0.09, -0.012, 0]} scale={0.047}>
          <mesh
            name="r"
            castShadow
            receiveShadow
            geometry={nodes.r.geometry}
            material={material}
            morphTargetDictionary={nodes.r.morphTargetDictionary}
            morphTargetInfluences={nodes.r.morphTargetInfluences}
            position={[-24.947, -14.116, 0]}
          />
          <mesh
            name="e"
            castShadow
            receiveShadow
            geometry={nodes.e.geometry}
            material={material}
            morphTargetDictionary={nodes.e.morphTargetDictionary}
            morphTargetInfluences={nodes.e.morphTargetInfluences}
            position={[-24.947, -14.116, 0]}
          />
          <mesh
            name="n"
            castShadow
            receiveShadow
            geometry={nodes.n.geometry}
            material={material}
            morphTargetDictionary={nodes.n.morphTargetDictionary}
            morphTargetInfluences={nodes.n.morphTargetInfluences}
            position={[-24.947, -14.116, 0]}
          />
          <mesh
            name="g"
            castShadow
            receiveShadow
            geometry={nodes.g.geometry}
            material={material}
            morphTargetDictionary={nodes.g.morphTargetDictionary}
            morphTargetInfluences={nodes.g.morphTargetInfluences}
            position={[-24.947, -14.116, 0]}
          />
          <mesh
            name="i"
            castShadow
            receiveShadow
            geometry={nodes.i.geometry}
            material={material}
            morphTargetDictionary={nodes.i.morphTargetDictionary}
            morphTargetInfluences={nodes.i.morphTargetInfluences}
            position={[-24.947, -14.116, 0]}
          />
          <mesh
            name="s"
            castShadow
            receiveShadow
            geometry={nodes.s.geometry}
            material={material}
            morphTargetDictionary={nodes.s.morphTargetDictionary}
            morphTargetInfluences={nodes.s.morphTargetInfluences}
            position={[-24.947, -14.116, 0]}
          />
          <mesh
            name="e_1"
            castShadow
            receiveShadow
            geometry={nodes.e_1.geometry}
            material={material}
            morphTargetDictionary={nodes.e_1.morphTargetDictionary}
            morphTargetInfluences={nodes.e_1.morphTargetInfluences}
            position={[-24.947, -14.116, 0]}
          />
          <mesh
            name="d"
            castShadow
            receiveShadow
            geometry={nodes.d.geometry}
            material={material}
            morphTargetDictionary={nodes.d.morphTargetDictionary}
            morphTargetInfluences={nodes.d.morphTargetInfluences}
            position={[-24.947, -14.116, 0]}
          />
          <mesh
            name="t"
            castShadow
            receiveShadow
            geometry={nodes.t.geometry}
            material={material}
            morphTargetDictionary={nodes.t.morphTargetDictionary}
            morphTargetInfluences={nodes.t.morphTargetInfluences}
            position={[-44.509, -14.116, 0]}
          />
          <mesh
            name="r_1"
            castShadow
            receiveShadow
            geometry={nodes.r_1.geometry}
            material={material}
            morphTargetDictionary={nodes.r_1.morphTargetDictionary}
            morphTargetInfluences={nodes.r_1.morphTargetInfluences}
            position={[-44.509, -14.116, 0]}
          />
          <mesh
            name="a"
            castShadow
            receiveShadow
            geometry={nodes.a.geometry}
            material={material}
            morphTargetDictionary={nodes.a.morphTargetDictionary}
            morphTargetInfluences={nodes.a.morphTargetInfluences}
            position={[-44.509, -14.116, 0]}
          />
          <mesh
            name="l"
            castShadow
            receiveShadow
            geometry={nodes.l.geometry}
            material={material}
            morphTargetDictionary={nodes.l.morphTargetDictionary}
            morphTargetInfluences={nodes.l.morphTargetInfluences}
            position={[-49.056, -14.116, 0]}
          />
          <mesh
            name="a_1"
            castShadow
            receiveShadow
            geometry={nodes.a_1.geometry}
            material={material}
            morphTargetDictionary={nodes.a_1.morphTargetDictionary}
            morphTargetInfluences={nodes.a_1.morphTargetInfluences}
            position={[-49.056, -14.116, 0]}
          />
          <mesh
            name="t_1"
            castShadow
            receiveShadow
            geometry={nodes.t_1.geometry}
            material={material}
            morphTargetDictionary={nodes.t_1.morphTargetDictionary}
            morphTargetInfluences={nodes.t_1.morphTargetInfluences}
            position={[-49.056, -14.116, 0]}
          />
          <mesh
            name="i_1"
            castShadow
            receiveShadow
            geometry={nodes.i_1.geometry}
            material={material}
            morphTargetDictionary={nodes.i_1.morphTargetDictionary}
            morphTargetInfluences={nodes.i_1.morphTargetInfluences}
            position={[-49.056, -14.116, 0]}
          />
          <mesh
            name="g_1"
            castShadow
            receiveShadow
            geometry={nodes.g_1.geometry}
            material={material}
            morphTargetDictionary={nodes.g_1.morphTargetDictionary}
            morphTargetInfluences={nodes.g_1.morphTargetInfluences}
            position={[-49.056, -14.116, 0]}
          />
          <mesh
            name="i_2"
            castShadow
            receiveShadow
            geometry={nodes.i_2.geometry}
            material={material}
            morphTargetDictionary={nodes.i_2.morphTargetDictionary}
            morphTargetInfluences={nodes.i_2.morphTargetInfluences}
            position={[-49.056, -14.116, 0]}
          />
          <mesh
            name="d_1"
            castShadow
            receiveShadow
            geometry={nodes.d_1.geometry}
            material={material}
            morphTargetDictionary={nodes.d_1.morphTargetDictionary}
            morphTargetInfluences={nodes.d_1.morphTargetInfluences}
            position={[-49.056, -14.116, 0]}
          />
        </group>
      </group>
    </group>
  );
};

export default AboutHeroTitleMobile;
