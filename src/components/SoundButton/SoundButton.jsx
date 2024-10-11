'use client';
import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Line } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';

import styles from './SoundButton.module.scss';

const getInitPoints = (amplitude) => {
  const pts = [];
  for (let i = 0; i < 100; i++) {
    pts.push(-0.8 + i / 60, Math.sin(i / 15) * amplitude, 0);
  }
  return pts;
};

const initAmplitude = {
  value: 0.25,
};

const SoundButton = ({
  className,
  duration = 1,
  active = true,
  handleClick,
}) => {
  const [amplitude, setAmplitude] = useState(initAmplitude.value);
  useGSAP(
    () => {
      console.log('active', active);

      gsap.to(initAmplitude, {
        value: active ? 0.25 : 0,
        duration,
        onUpdate: () => {
          setAmplitude(initAmplitude.value);
        },
      });
    },
    { dependencies: [active] }
  );

  return (
    <button className={clsx(styles.button, className)} onClick={handleClick}>
      <Canvas
        className={styles.canvas}
        camera={{ position: [0, 0, 3], orthographic: true }}
      >
        <Wave amplitude={amplitude} />
      </Canvas>
    </button>
  );
};

const Wave = ({ amplitude }) => {
  const lineRef = useRef();
  const points = useRef(getInitPoints(amplitude));

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const pts = [];
    for (let i = 0; i < 100; i++) {
      pts.push(-0.8 + i / 60, Math.sin((i + time * 100) / 17) * amplitude, 0);
    }
    lineRef.current.geometry.setPositions(pts);
  });

  return (
    <Line
      ref={lineRef}
      points={points.current}
      color="#f52b2b"
      lineWidth={3}
      dashed={false}
    />
  );
};

export default SoundButton;
