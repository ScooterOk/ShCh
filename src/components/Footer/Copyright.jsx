import React from 'react';

import styles from './Footer.module.scss';

const Copyright = () => {
  return (
    <div className={styles.copyright}>
      <p>Development by Dmytro Oborskyi</p>
      <p>Music by Dmitry Tkach</p>
      <p>Design by Serhii Churilov</p>
    </div>
  );
};

export default Copyright;
