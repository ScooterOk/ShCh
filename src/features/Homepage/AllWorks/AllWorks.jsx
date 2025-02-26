import React, { Suspense, useContext, useRef } from 'react';

import styles from './AllWorks.module.scss';
import { Canvas } from '@react-three/fiber';
import HomeAllWorksTitle from '@/components/Home/HomeAllWorksTitle';
import useMobile from '@/hooks/useMobile';
import HomeAllWorksTitleMobile from '@/components/Home/HomeAllWorksTitleMobile';
import { mainContext } from '@/providers/MainProvider';

const AllWorks = () => {
  const { loadedVideos } = useContext(mainContext);
  const container = useRef();

  const { isMobile } = useMobile();

  if (!loadedVideos?.['/video/allworks.mp4']) return null;

  return (
    <div className={styles.allworks} ref={container}>
      <div className={styles.allworks__title}>
        <Canvas
          camera={{ position: [0, 0, 1], orthographic: true }}
          //   gl={{ stencil: true }}
        >
          <Suspense fallback={null}>
            <group scale={isMobile ? 0 : 1}>
              {loadedVideos?.['/models/viewall.gltf'] && (
                <HomeAllWorksTitle container={container.current} />
              )}
            </group>
            <group scale={isMobile ? 1 : 0}>
              {loadedVideos?.['/models/viewall_mobile.gltf'] && (
                <HomeAllWorksTitleMobile container={container.current} />
              )}
            </group>
          </Suspense>
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </div>
  );
};

export default AllWorks;
