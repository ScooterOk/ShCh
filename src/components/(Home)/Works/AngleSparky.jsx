import HoverLink from '@/components/HoverLink';
import Image from 'next/image';
import React, { useRef } from 'react';

const AngleSparky = ({ styles }) => {
  const mediaRef = useRef();

  return (
    <div className={styles.angle_sparky}>
      <div className={styles.angle2}>
        <div className={styles.media}>
          <video
            ref={mediaRef}
            width="840"
            height="434"
            preload="auto"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/video/works/Angle2_preview.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.information}>
          <h3 className={styles.information__title}>Angle2 Agency</h3>
          <p className={styles.information__description}>
            Discription. Create digital experience that merge art <br />
            diraction, branding, strategy.
          </p>
          <div className={styles.information__link}>
            <HoverLink href="/works/koenigsegg">View Case</HoverLink>
          </div>
        </div>
      </div>
      <div className={styles.sparky}>
        <div className={styles.media}>
          <video
            ref={mediaRef}
            width="840"
            height="434"
            preload="auto"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/video/works/sparky_preview.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.information}>
          <h3 className={styles.information__title}>Sparky.Us</h3>
          <p className={styles.information__description}>
            Discription. Create digital experience that merge art <br />
            diraction, branding, strategy.
          </p>
          <div className={styles.information__link}>
            <HoverLink href="/works/koenigsegg">View Case</HoverLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AngleSparky;
