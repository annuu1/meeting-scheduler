import React from 'react';
import styles from '../../styles/AvailabilityScheduler.module.css'

const Dropdowns = ({ activity, setActivity, timeZone, setTimeZone }) => {
  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownWrapper}>
        <label className={styles.dropdownLabel}>Activity</label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className={styles.dropdown}
        >
          <option>Event type</option>
          <option>Meeting</option>
          <option>Call</option>
        </select>
      </div>
      <div className={styles.dropdownWrapper}>
        <label className={styles.dropdownLabel}>Time Zone</label>
        <select
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
          className={styles.dropdown}
        >
          <option>India Standard Time</option>
          <option>UTC</option>
          <option>Eastern Standard Time</option>
        </select>
      </div>
    </div>
  );
};

export default Dropdowns;