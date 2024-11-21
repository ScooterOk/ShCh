import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

const Backgrounds = ({ styles }) => {
  return (
    <>
      <video
        className={styles.silver}
        width="320"
        height="320"
        preload="auto"
        muted
        loop
        playsInline
      >
        <source src="/video/follow/silver.mp4" type="video/mp4" />
      </video>
      <video
        className={styles.robo}
        width="640"
        height="360"
        preload="auto"
        muted
        loop
        playsInline
      >
        <source src="/video/follow/robo.mp4" type="video/mp4" />
      </video>
      <video
        className={styles.astranaut}
        width="320"
        height="320"
        preload="auto"
        muted
        loop
        playsInline
      >
        <source src="/video/follow/astranaut.mp4" type="video/mp4" />
      </video>
      <video
        className={styles.venera}
        width="320"
        height="180"
        preload="auto"
        muted
        loop
        playsInline
      >
        <source src="/video/follow/venera.mp4" type="video/mp4" />
      </video>
    </>
  );
};

export default Backgrounds;
