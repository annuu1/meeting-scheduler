import React, {useState} from 'react'
import Sidebar from '../components/layout/Sidebar'
import styles from '../styles/Dashboard.module.css'
import { Link } from 'react-router-dom'

import EventList from '../components/Events/EventList'
import Booking from '../components/booking/Booking'

function Dashboard() {
    const [activeTab, setActiveTab] = useState('events');

  return (
    <div className={styles.container}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className={styles.main}>
            {activeTab === 'events' && <EventList />}
            {activeTab === 'booking' && <Booking />}
        </main>
    </div>
  )
}

export default Dashboard