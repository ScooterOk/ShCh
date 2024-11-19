import React from 'react';
import Clock from 'react-live-clock';
import styles from './Footer.module.scss';

const Date = () => {
  return (
    <div className={styles.date}>
      <Clock
        format={'HH:mm:ss'}
        ticking={true}
        timezone={'Europe/Kyiv'}
        noSsr
      />
      <p>Kyiv, Ukraine</p>
    </div>
  );
};

export default Date;
