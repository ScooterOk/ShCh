import React from 'react';

import styles from './Footer.module.scss';

const Copyright = () => {
  return (
    <div className={styles.copyright}>
      <p>
        {Array.from('Development by Dmytro Oborskyi').map((l, i) => (
          <span data-animation key={`name-${l}-${i}-${l}`}>
            {l}
          </span>
        ))}
      </p>
      <p>
        {Array.from('Music by Dmitry Tkach').map((l, i) => (
          <span data-animation key={`name-${l}-${i}-${l}`}>
            {l}
          </span>
        ))}
      </p>
      <p>
        {Array.from('Design by Serhii Churilov').map((l, i) => (
          <span data-animation key={`name-${l}-${i}-${l}`}>
            {l}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Copyright;
