import React from 'react'
import styles from '../../styles/AvailabilityScheduler.module.css'

import availabilityTab from "../../assets/icons/availabilityTab.svg";
import calendarTab from "../../assets/icons/calendarTab.svg";

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className={styles.tabContainer}>
        <button
        onClick={() => setActiveTab('Availability')}
        className={`${styles.tab} ${activeTab === 'Availability' ? styles.active : ''}`}
      >
        <img src={availabilityTab} alt="" />
        Availability</button>
      <button
        onClick={() => setActiveTab('Calendar View')}
        className={`${styles.tab} ${activeTab === 'Calendar View' ? styles.active : ''}`}
      >
        <img src={calendarTab} alt="" />
        Calendar View
      </button>
    </div>
  );
}

export default Tabs