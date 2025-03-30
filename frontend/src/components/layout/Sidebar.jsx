import React from 'react';
import events from '../../assets/icons/events.svg';
import availability from '../../assets/icons/availability.svg';
import booking from '../../assets/icons/booking.svg';
import settings from '../../assets/icons/settings.svg';

import { Routes, Route, NavLink } from "react-router-dom";

import styles from '../../styles/Sidebar.module.css';
import Header from './Header';
import UserProfile from './UserProfile';

function Sidebar({ activeTab, setActiveTab }) {
  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.sidebar}>
     <div className={styles.sidebar}>
        <Header />
        <nav className={styles.nav}>
          <NavLink
            to="/dashboard/events"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <img src={events} alt="Events" className={styles.navItemIcon} />
            Events
          </NavLink>

          <NavLink
            to="/dashboard/booking"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <img src={booking} alt="Bookings" className={styles.navItemIcon} />
            Booking
          </NavLink>

          <NavLink
            to="/dashboard/availability"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <img
              src={availability}
              alt="Availability"
              className={styles.navItemIcon}
            />
            Availability
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <img src={settings} alt="Settings" className={styles.navItemIcon} />
            Settings
          </NavLink>

          <NavLink
            to="/dashboard/create"
            className={({ isActive }) =>
              `${styles.createButton} ${isActive ? styles.active : ""}`
            }
          >
            <span className={styles.plus}>+</span> Create
          </NavLink>
        </nav>
        <UserProfile />
      </div>

    </div>
  );
}

export default Sidebar;