import React from 'react';

import styles from './Footer.module.scss';
import HoverLink from '../HoverLink/HoverLink';
import clsx from 'clsx';

const Links = () => {
  return (
    <div className={styles.links}>
      <HoverLink
        className={clsx(styles.links__link, styles.links__link_email)}
        href="mailto:hi@churilov.com"
        Component={'a'}
      >
        hi@churilov.com
      </HoverLink>
      <HoverLink
        className={styles.links__link}
        href="/"
        Component={'a'}
        line={false}
      >
        Instagram
      </HoverLink>
      <HoverLink
        className={styles.links__link}
        href="/"
        Component={'a'}
        line={false}
      >
        LinkedIn
      </HoverLink>
      <HoverLink
        className={styles.links__link}
        href="/"
        Component={'a'}
        line={false}
      >
        Dribbble
      </HoverLink>
      <HoverLink
        className={styles.links__link}
        href="/"
        Component={'a'}
        line={false}
      >
        Facebook
      </HoverLink>
    </div>
  );
};

export default Links;
