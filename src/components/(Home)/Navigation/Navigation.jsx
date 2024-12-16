'use client';
import React, { useContext, useRef } from 'react';

import styles from './Navigation.module.scss';
import Link from 'next/link';
import SoundButton from '@/components/SoundButton/SoundButton';
import { mainContext } from '@/providers/MainProvider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Music from '@/components/Music';
const Navigation = () => {
  const { isLoaded, setNoScroll } = useContext(mainContext);
  const rootRef = useRef();

  useGSAP(
    () => {
      if (isLoaded) {
        gsap
          .timeline({
            delay: 2,
          })
          .from(rootRef.current, {
            duration: 1,
            autoAlpha: 0,
            y: 100,
            ease: 'power3.out',
          })
          .from(rootRef.current.querySelector('canvas'), {
            duration: 1,
            opacity: 0,
          })
          .set(rootRef.current, { clearProps: 'transform' })
          .add(() => setNoScroll(false));
      }
    },
    { dependencies: [isLoaded] }
  );

  return (
    <div ref={rootRef} className={styles.navigation}>
      <Music />
      <ul>
        <li>
          <Link className={styles.active} href={'/'}>
            Home
          </Link>
        </li>
        <li>
          <Link href={'/'}>Work</Link>
        </li>
        <li>
          <Link href={'/'}>About</Link>
        </li>
        <li>
          <Link href={'/'}>Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
