import React, { Suspense } from 'react';

import styles from './Footer.module.scss';
import Date from './Date';
import FooterTitle from './Title';
import { Canvas } from '@react-three/fiber';
import Links from './Links';
import Copyright from './Copyright';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Date />
      <div className={styles.title}>
        <Canvas camera={{ position: [0, 0, 1], orthographic: true }}>
          <Suspense fallback={null}>
            <FooterTitle />
          </Suspense>
        </Canvas>
        <div className={styles.title__description}>
          extraordinary <br /> digital <br /> experience
        </div>
      </div>
      <Links />
      <Copyright />
    </div>
  );
};

export default Footer;
