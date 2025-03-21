import React from 'react';
import events from '../../assets/icons/events.svg';
import availability from '../../assets/icons/availability.svg';
import booking from '../../assets/icons/booking.svg';
import settings from '../../assets/icons/settings.svg';

import { Link } from 'react-router-dom';

import styles from '../../styles/Sidebar.module.css';

function Sidebar({ setActiveTab }) {

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.sidebar}>
      <ul className={styles.list}>
        <li onClick={() => handleClick("events")}>
          <img src={events} alt="Events" />
          <button>Events</button>
        </li>
        <li onClick={() => handleClick("booking")}>
          <img src={booking} alt="Bookings" />
          <button>Bookings</button>
        </li>
        <li onClick={() => handleClick("availability")}>
          <img src={availability} alt="Availability" />
          <button>Availability</button>
        </li>
        <li onClick={() => handleClick("settings")}>
          <img src={settings} alt="Settings" />
          <button>Settings</button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;