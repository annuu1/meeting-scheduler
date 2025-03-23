import React from 'react';
import events from '../../assets/icons/events.svg';
import availability from '../../assets/icons/availability.svg';
import booking from '../../assets/icons/booking.svg';
import settings from '../../assets/icons/settings.svg';
import avatar from '../../assets/icons/avatar.png';

import { Link } from 'react-router-dom';

import styles from '../../styles/Sidebar.module.css';
import Header from './Header';

function Sidebar({ setActiveTab }) {

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.sidebar}>
      <Header/>
      <nav className={styles.nav}>
      <ul >
        <li>
          
          <button  onClick={() => handleClick("events")} className={styles.navItem}>
          <img src={events} alt="Events" className={styles.navItemIcon} />Events
          </button>
        </li>
        <li>
        <button onClick={() => handleClick("booking")} className={styles.navItem}>
          <img src={booking} alt="Bookings" className={styles.navItemIcon} />
         Bookings</button>
        </li>
        <li>
        <button className={styles.navItem}  onClick={() => handleClick("availability")}>
          <img src={availability} alt="Availability" className={styles.navItemIcon} />
          Availability</button>
        </li>
        <li>
        <button  onClick={() => handleClick("settings")} className={styles.navItem}>
          <img src={settings} alt="Settings" className={styles.navItemIcon} />
          Settings</button>
        </li>
      </ul>
      </nav>
      <div className={styles.userProfile}>
                <img src={avatar} alt="User" className={styles.userAvatar} />
                <span className={styles.userName}>Sarthak Pal</span>
      </div>
     
    </div>
  );
}

export default Sidebar;