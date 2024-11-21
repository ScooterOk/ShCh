import Link from 'next/link';
import React, { useRef } from 'react';

import styles from './HoverLink.module.scss';
import clsx from 'clsx';
import gsap from 'gsap';

const random = Math.random();

const HoverLink = ({
  Component = Link,
  href = '',
  children,
  className,
  line = true,
}) => {
  const linkRef = useRef();
  const onMouseEnter = (e) => {
    const each = 0.5 / children?.length / 2;
    const currentTargets = linkRef.current.querySelectorAll('span');
    if (e.type === 'mouseenter') {
      gsap
        .timeline()
        .to(currentTargets, {
          duration: 0.1,
          opacity: 0,
          stagger: {
            each,
            grid: 'auto',
            from: 'random',
          },
        })
        .to(currentTargets, {
          duration: 0.3,
          opacity: 1,
          stagger: {
            each,
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
    >
      <Component href={href} ref={linkRef} onMouseEnter={onMouseEnter}>
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
