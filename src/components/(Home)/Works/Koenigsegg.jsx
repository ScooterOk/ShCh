import HoverLink from '@/components/HoverLink';
import React, { useRef } from 'react';

const Koenigsegg = ({ styles }) => {
  const mediaRef = useRef();

  return (
    <div className={styles.koenigsegg}>
      <video
        className={styles.media}
        ref={mediaRef}
        width="1980"
        height="769"
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/works/koenigsegg_preview.mp4" type="video/mp4" />
      </video>
      <div className={styles.information}>
        <h3 className={styles.information__title}>Koenigsegg</h3>
        <p className={styles.information__description}>
          Digital design concept for promo <br /> website Koenigsegg GEMERA
        </p>
        <div className={styles.information__link}>
          <HoverLink href="/works/koenigsegg">View Case</HoverLink>
        </div>
      </div>
    </div>
  );
};

export default Koenigsegg;
