import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useContext, useRef } from 'react';

const HomeHeroVideoPlayer = ({ styles, setShowVideoPlayer }) => {
  const { isLoaded } = useContext(mainContext);
  const rootRef = useRef();
  const previewRef = useRef();
  const button = useRef();

  useGSAP(
    () => {
      if (isLoaded) {
        gsap
          .timeline()
          .set(rootRef.current, { visibility: 'visible' })
          .from(rootRef.current, 1, { scaleY: 0, ease: 'power3.inOut' })
          .from(previewRef.current, 1, {
            opacity: 0,
            ease: 'power3.inOut',
            onStart: () => previewRef.current.play(),
          })
          .from(button.current, 1, { scaleY: 0, ease: 'power4.out' }, '<');
      }
    },
    { dependencies: [isLoaded] }
  );

  return (
    <div ref={rootRef} className={styles.player_preview}>
      <video
        ref={previewRef}
        width="1920"
        height="1080"
        preload="auto"
        muted
        loop
        playsInline
      >
        <source src="/video/ShowreelLoop_03.mp4" type="video/mp4" />
      </video>
      <div className={styles.button}>
        <button ref={button} onClick={() => setShowVideoPlayer(true)} />
      </div>
    </div>
  );
};

export default HomeHeroVideoPlayer;
