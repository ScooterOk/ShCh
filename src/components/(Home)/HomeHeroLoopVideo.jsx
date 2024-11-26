import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import React, { useContext, useRef } from 'react';

const HomeHeroLoopVideo = ({ styles }) => {
  const { isLoaded, loadedVideos } = useContext(mainContext);
  const rootRef = useRef();
  const initVideoRef = useRef();
  const mainVideoRef = useRef();

  useGSAP(
    () => {
      if (isLoaded) {
        gsap
          .timeline()
          .from(rootRef.current, {
            duration: 1,
            autoAlpha: 0,
            scaleY: 0,
            ease: 'power3.inOut',
          })
          .call(() => {
            initVideoRef.current.play();
          });
        initVideoRef.current.addEventListener(
          'ended',
          () => {
            gsap.set(initVideoRef.current, { autoAlpha: 0 });
            gsap.set(mainVideoRef.current, { autoAlpha: 1 });
            mainVideoRef.current.play();
          },
          false
        );
      }
    },
    { dependencies: [isLoaded] }
  );

  return (
    <div ref={rootRef} className={styles.loop_video}>
      {loadedVideos?.['/video/Hero_head_video_01.mp4'] && (
        <video
          className={styles.loop_video_init}
          ref={initVideoRef}
          width="250"
          height="250"
          preload="auto"
          muted
          playsInline
        >
          <source
            src={loadedVideos?.['/video/Hero_head_video_01.mp4']}
            type="video/mp4"
          />
        </video>
      )}

      {loadedVideos?.['/video/Hero_head_video_02.mp4'] && (
        <video
          className={styles.loop_video_main}
          ref={mainVideoRef}
          width="250"
          height="250"
          preload="auto"
          loop
          muted
          playsInline
        >
          <source
            src={loadedVideos?.['/video/Hero_head_video_02.mp4']}
            type="video/mp4"
          />
        </video>
      )}
    </div>
  );
};

// const CircularMask = (props) => (
//   <group {...props}>
//     <PivotControls
//       offset={[0, 0, 1]}
//       activeAxes={[true, true, false]}
//       disableRotations
//       depthTest={false}
//     >
//       <Frame position={[0, 0, 0.1]} />
//       <Mask id={1} position={[0, 0, 0.1]} rotation={[0, 0, -Math.PI / 4]}>
//         <circleGeometry args={[0.5, 4]} />
//       </Mask>
//     </PivotControls>
//   </group>
// );

// function VideoMaterial({ url }) {
//   const size = useAspect(180, 100, 0.1);
//   const texture = useVideoTexture(url, { loop: true });
//   const stencil = useMask(1, false);
//   console.log("stencil", stencil);

//   return (
//     <mesh>
//       <planeGeometry args={size} />
//       {/* <meshPhongMaterial color="#33BBFF" {...stencil} /> */}
//       <meshBasicMaterial map={texture} toneMapped={false} {...stencil} />;
//     </mesh>
//   );
// }

export default HomeHeroLoopVideo;
