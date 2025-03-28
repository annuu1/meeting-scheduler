import React from 'react';
import styles from './DashboardLayout.module.css';

const DashboardLayout = ({ title, subtitle, headerAction, children }) => {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.headerTitle}>{title}</h1>
          <p className={styles.headerSubtitle}>{subtitle}</p>
        </div>
        {headerAction && <div className={styles.headerAction}>{headerAction}</div>}
      </div>

      {/* Main Content Section */}
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;