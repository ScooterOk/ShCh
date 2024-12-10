'use client';
import React, { useEffect, useRef, useState } from 'react';
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

const SoundButton = ({
  className,
  duration = 1,
  active = true,
  handleClick,
  color = '#f52b2b',
}) => {
  const [amplitude, setAmplitude] = useState(active ? 0.25 : 0);

  const initAmplitude = useRef(0.25);

  useEffect(() => {
    gsap.to(initAmplitude, {
      current: active ? 0.25 : 0,
      duration,
      onUpdate: () => {
        setAmplitude(initAmplitude.current);
      },
    });
  }, [active, duration]);

  return (
    <button className={clsx(styles.button, className)} onClick={handleClick}>
      <Canvas
        className={styles.canvas}
        camera={{ position: [0, 0, 3], orthographic: true }}
      >
        <Wave amplitude={amplitude} color={color} />
      </Canvas>
    </button>
  );
};

const Wave = ({ amplitude, color }) => {
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
      color={color}
      lineWidth={3}
      dashed={false}
    />
  );
};

export default SoundButton;
