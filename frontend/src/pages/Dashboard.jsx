import React, {useState} from 'react'
import Sidebar from '../components/layout/Sidebar'
import styles from '../styles/Dashboard.module.css'
import { Link } from 'react-router-dom'

import EventList from '../components/Events/EventList'

function Dashboard() {
    const [activeTab, setActiveTab] = useState('events');

  return (
    <div className={styles.container}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className={styles.main}>
            <h1>Event Types</h1>
            <p>Create events to share for people to book on your calendar. New</p>
            <Link to="/events/new" >Add New Event</Link>
            {activeTab === 'events' && <EventList />}
            {activeTab === 'booking' && <EventList />}
        </main>
    </div>
  )
}

export default Dashboard