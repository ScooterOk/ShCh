import React from 'react';

import styles from './Footer.module.scss';
import HoverLink from '../HoverLink';

const Links = () => {
  return (
    <div className={styles.links}>
      <HoverLink
        className={styles.links__email}
        href="mailto:hi@churilov.com"
        Component={'a'}
      >
        hi@churilov.com
      </HoverLink>
      <HoverLink href="/" Component={'a'} line={false}>
        Instagram
      </HoverLink>
      <HoverLink href="/" Component={'a'} line={false}>
        LinkedIn
      </HoverLink>
      <HoverLink href="/" Component={'a'} line={false}>
        Dribbble
      </HoverLink>
      <HoverLink href="/" Component={'a'} line={false}>
        Facebook
      </HoverLink>
    </div>
  );
};

export default Links;
