import React from 'react';

import styles from './Footer.module.scss';
import HoverLink from '../HoverLink/HoverLink';
import clsx from 'clsx';

const Links = () => {
  return (
    <div className={styles.links}>
      <HoverLink
        className={clsx(styles.links__link, styles.links__link_email)}
        href="mailto:hi@serhiichurilov.com"
        Component={'a'}
      >
        hi@serhiichurilov.com
      </HoverLink>
      <HoverLink
        className={styles.links__link}
        href="https://www.instagram.com/serhii_churilov/"
        Component={'a'}
        line={false}
        target="_blank"
      >
        Instagram
      </HoverLink>
      <HoverLink
        className={styles.links__link}
        href="https://www.linkedin.com/in/sergeychurilov6a268511b"
        Component={'a'}
        line={false}
        target="_blank"
      >
        LinkedIn
      </HoverLink>
      <HoverLink
        className={styles.links__link}
        href="https://dribbble.com/serhii_churilov"
        Component={'a'}
        line={false}
        target="_blank"
      >
        Dribbble
      </HoverLink>
      <HoverLink
        className={styles.links__link}
        href="https://www.facebook.com/serhiichurilov"
        Component={'a'}
        line={false}
        target="_blank"
      >
        Facebook
      </HoverLink>
    </div>
  );
};

export default Links;
