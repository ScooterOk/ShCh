import Link from 'next/link';
import React, { useContext, useRef } from 'react';

import styles from './HoverLink.module.scss';
import clsx from 'clsx';
import gsap from 'gsap';
import { handleHoverSound } from '@/services';
import { mainContext } from '@/providers/MainProvider';

const random = Math.random();

const HoverLink = ({
  Component = Link,
  href = '',
  children,
  className,
  line = true,
}) => {
  const linkRef = useRef();
  const { isMuted } = useContext(mainContext);

  const onMouseEnter = (e) => {
    const currentTargets = linkRef.current.querySelectorAll('span');

    // Play hover sound
    if (!isMuted) handleHoverSound();

    if (e.type === 'mouseenter') {
      gsap
        .timeline()
        .to(currentTargets, {
          duration: 0.1,
          opacity: 0,
          stagger: {
            amount: 0.3,
            grid: 'auto',
            from: 'random',
          },
        })
        .to(currentTargets, {
          duration: 0.01,
          opacity: 1,
          stagger: {
            amount: 0.3,
            grid: 'auto',
            from: 'random',
          },
        });
    }
  };

  return (
    <div
      className={clsx(
        styles.link,
        line && styles.withline,
        className && className
      )}
      onMouseEnter={onMouseEnter}
    >
      <Component href={href} ref={linkRef}>
        {Array.from(children).map((l, i) => (
          <span
            data-animation
            key={`name-${random.toFixed(3) * 1000}-${l}-${i}-${l}`}
          >
            {l}
          </span>
        ))}
      </Component>
    </div>
  );
};

export default HoverLink;
