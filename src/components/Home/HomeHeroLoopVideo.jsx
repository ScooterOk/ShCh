import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import React, { useContext, useRef } from 'react';

const HomeHeroLoopVideo = ({ styles }) => {
  const { isLoaded, loadedMedia } = useContext(mainContext);
  const rootRef = useRef();
  const initVideoRef = useRef();
  const mainVideoRef = useRef();

  useGSAP(
    () => {
      if (isLoaded) {
        gsap
          .timeline()
          .set(rootRef.current, {
            autoAlpha: 1,
          })
          .from(rootRef.current, {
            duration: 1,
            scaleY: 0,
            ease: 'power3.inOut',
          })
          .call(() => {
            initVideoRef.current.play();
          });
        initVideoRef?.current?.addEventListener(
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
      {loadedMedia?.['/video/Hero_head_video_01.mp4'] && (
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
            src={loadedMedia?.['/video/Hero_head_video_01.mp4']}
            type="video/mp4"
          />
        </video>
      )}

      {loadedMedia?.['/video/Hero_head_video_02.mp4'] && (
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
            src={loadedMedia?.['/video/Hero_head_video_02.mp4']}
            type="video/mp4"
          />
        </video>
      )}
    </div>
  );
};

export default HomeHeroLoopVideo;
