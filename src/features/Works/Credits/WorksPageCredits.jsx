import React from 'react';
import styles from './WorksPageCredits.module.scss';

const WorksPageCredits = ({ credits: list }) => {
  return (
    <div className={styles.credits}>
      <h2 className={styles.credits__title}>
        {Array.from('Credits:').map((l, i) => (
          <span key={`name-${l}-${i}-${l}`}>{l}</span>
        ))}
      </h2>
      <ul className={styles.credits__list}>
        {list?.map((item) => (
          <li key={`credit-${item.id}`}>
            <p>
              {Array.from(item.title).map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </p>
            <p>
              {Array.from(item.name).map((l, i) => (
                <span key={`name-${l}-${i}-${l}`}>{l}</span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorksPageCredits;
