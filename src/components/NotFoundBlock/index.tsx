import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFound: React.FC = () => {
  return (
    <h1 className={styles.root}>
      <span>😕</span>
      <br />
      <p className={styles.description}>Page Not Found</p>
    </h1>
  );
}

export default NotFound;
