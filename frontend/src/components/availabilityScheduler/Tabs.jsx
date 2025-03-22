import React from 'react'
import styles from '../../styles/AvailabilityScheduler.module.css'

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className={styles.tabContainer}>
        <button
        onClick={() => setActiveTab('Availability')}
        className={`${styles.tab} ${activeTab === 'Availability' ? styles.active : ''}`}
      >Availability</button>
      <button
        onClick={() => setActiveTab('Calendar View')}
        className={`${styles.tab} ${activeTab === 'Calendar View' ? styles.active : ''}`}
      >
        Calendar View
      </button>
    </div>
  );
}

export default Tabs