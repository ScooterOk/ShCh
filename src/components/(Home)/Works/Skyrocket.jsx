import HoverLink from '@/components/HoverLink';
import Image from 'next/image';
import React, { useRef } from 'react';

const Skyrocket = ({ styles }) => {
  const mediaRef = useRef();

  return (
    <div className={styles.skyrocket}>
      <div className={styles.media}>
        <div className={styles.media__logo}>
          <Image
            src="/img/logo_sky.svg"
            width="82"
            height="70"
            alt="Skyrocket"
          />
        </div>
        <div className={styles.media__video}>
          <video
            ref={mediaRef}
            width="1280"
            height="769"
            preload="auto"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/video/works/Skyrocket_preview.mp4" type="video/mp4" />
          </video>
          <div className={styles.information}>
            <h3 className={styles.information__title}>Skyrocket</h3>
            <p className={styles.information__description}>
              Brand, Web and Motion Design for the Digital <br /> Agency
              SKYROCKET
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

export default Skyrocket;
