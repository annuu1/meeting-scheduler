import React from 'react'
import styles from '../../styles/BookingTabs.module.css'

function BookingTabs({ activeTab, onTabChange }) {
  const tabs = ['upcoming', 'pending', 'cancelled', 'past'];

  return (
    <div className={styles.tabs}>
      {
        tabs.map((tab, index) => (
          <button
          key={index}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => onTabChange(tab)}
        > 
        {tab.charAt(0).toUpperCase()+tab.slice(1)} 
        </button>
        ))
      }
    </div>
  )
}

export default BookingTabs