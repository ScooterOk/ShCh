import IconButton from '@/components/IconButton/IconButton';
import { IconArrowLeft } from '@/components/icons';
import React from 'react';

import styles from './WorksPageHero.module.scss';

const WorksPageHero = ({ title, description, tags }) => {
  return (
    <div className={styles.hero}>
      <IconButton href={'/works'}>
        <IconArrowLeft />
      </IconButton>
      <div className={styles.info}>
        {title && (
          <div className={styles.info__title}>
            <h1>{title}</h1>
          </div>
        )}
        {description && (
          <div className={styles.info__description}>{description}</div>
        )}
        {tags?.length && (
          <div className={styles.info__tags}>
            {tags?.map((tag) => (
              <span key={`tag-${tag}`}>#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorksPageHero;
