import React from 'react'
import events from '../../assets/icons/events.svg'
import availability from '../../assets/icons/availability.svg'
import booking from '../../assets/icons/booking.svg'
import settings from '../../assets/icons/settings.svg'

import { Link } from 'react-router-dom'

import styles from '../../styles/Sidebar.module.css'

function Sidebar() {
  return (
    <div className={styles.sidebar} >
        <ul className={styles.list}>
            <li><img src={events} alt="" />
            <Link to="/events">Events </Link> </li>
            <li><img src={booking} alt="" />
            <Link to="/bookings">Bookings </Link></li>
            <li><img src={availability} alt="" />
            <Link to="/availability">Availability </Link></li>
            <li><img src={settings} alt="" />
            <Link to="/settings">Settings </Link></li>
        </ul>
    </div>
  )
}

export default Sidebar