import HoverLink from '@/components/HoverLink';
import Image from 'next/image';
import React, { useRef } from 'react';

const Mesmerized = ({ styles }) => {
  const mediaRef = useRef();

  return (
    <div className={styles.mesmerized}>
      <div className={styles.media}>
        <div className={styles.media__video}>
          <video
            ref={mediaRef}
            width="520"
            height="520"
            preload="auto"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="/video/works/mesmerized_preview.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className={styles.media__logo}>
          <Image
            src="/img/mesmerized.png"
            width="1280"
            height="742"
            alt="Mesmerized"
          />
          <div className={styles.information}>
            <h3 className={styles.information__title}>Mesmerized</h3>
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
    </div>
  );
};

export default Mesmerized;
