import React from 'react';
import Clock from './Clock';

import styles from './Footer.module.scss';

const Date = () => {
  return (
    <div className={styles.date}>
      <Clock />
      <p>
        {Array.from('Kyiv, Ukraine').map((l, i) => (
          <span data-animation key={`name-${l}-${i}-${l}`}>
            {l}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Date;
