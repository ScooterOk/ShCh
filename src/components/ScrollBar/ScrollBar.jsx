'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';

import styles from './ScrollBar.module.scss';

const ScrollBar = () => {
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbOffset, setThumbOffset] = useState(0);

  const lenis = useLenis();

  const scrollbarRef = useRef();

  useEffect(() => {
    if (lenis) {
      lenis.on('scroll', ({ scroll }) => {
        const offset =
          (scroll / (document.body.clientHeight - window.innerHeight)) * 100;
        const height = Number(
          (window.innerHeight / document.body.clientHeight) * 320
        ).toFixed();
        setThumbHeight(height);
        setThumbOffset(offset);
        gsap
          .timeline()
          .to(scrollbarRef.current, {
            opacity: 1,
            duration: 0.5,
            overwrite: true,
          })
          .to(
            scrollbarRef.current,
            {
              opacity: 0,
              duration: 0.5,
            },
            '+=0.5'
          );
      });
    }
  }, [lenis]);

  // if (!isLoaded) return null;

  return (
    <div className={styles.scrollbar} ref={scrollbarRef} data-id="scrollbar">
      <div
        className={styles.scrollbar__thumb}
        style={{ '--thumb-height': thumbHeight, '--thumb-offset': thumbOffset }}
      />
    </div>
  );
};

export default ScrollBar;
