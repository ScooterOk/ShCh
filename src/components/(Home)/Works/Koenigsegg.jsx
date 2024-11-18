import Link from 'next/link';
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
        <source src="/video/ShowreelLoop_03.mp4" type="video/mp4" />
      </video>
      <div className={styles.information}>
        <h3 className={styles.information__title}>Koenigsegg</h3>
        <p className={styles.information__description}>
          Digital design concept for promo <br /> website Koenigsegg GEMERA
        </p>
        <div className={styles.information__link}>
          <Link href="/works/koenigsegg">View Case</Link>
        </div>
      </div>
    </div>
  );
};

export default Koenigsegg;
