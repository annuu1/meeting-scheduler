import React from 'react';
import events from '../../assets/icons/events.svg';
import availability from '../../assets/icons/availability.svg';
import booking from '../../assets/icons/booking.svg';
import settings from '../../assets/icons/settings.svg';


import styles from '../../styles/Sidebar.module.css';
import Header from './Header';
import UserProfile from './UserProfile';

function Sidebar({ activeTab, setActiveTab }) {
  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.sidebar}>
      <Header />
      <nav className={styles.nav}>
        <ul>
          <li>
            <button
              onClick={() => handleClick("events")}
              className={`${styles.navItem} ${activeTab === "events" ? styles.active : ""}`}
            >
              <img src={events} alt="Events" className={styles.navItemIcon} />
              Events
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick("booking")}
              className={`${styles.navItem} ${activeTab === "booking" ? styles.active : ""}`}
            >
              <img src={booking} alt="Bookings" className={styles.navItemIcon} />
              Bookings
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick("availability")}
              className={`${styles.navItem} ${activeTab === "availability" ? styles.active : ""}`}
            >
              <img src={availability} alt="Availability" className={styles.navItemIcon} />
              Availability
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick("settings")}
              className={`${styles.navItem} ${activeTab === "settings" ? styles.active : ""}`}
            >
              <img src={settings} alt="Settings" className={styles.navItemIcon} />
              Settings
            </button>
          </li>
          {activeTab === "events" && (
            <li>
              <button className={`${styles.createButton}`}>
                <span className={styles.plus}>+</span>
                Create
              </button>
            </li>
          )}
        </ul>
      </nav>
      <UserProfile/>
    </div>
  );
}

export default Sidebar;