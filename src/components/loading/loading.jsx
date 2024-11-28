// components/Loading.js
import React from 'react';

import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className={styles.loadingoverlay}>
            <div className={styles.loadingspinner}></div>
        </div>
    );
};

export default Loading;
