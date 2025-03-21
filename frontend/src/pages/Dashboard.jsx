import React, {useState} from 'react'
import Navbar from '../components/layout/Sidebar'
import styles from '../styles/Dashboard.module.css'
import { Link } from 'react-router-dom'

import EventCard from '../components/Events/EventCard'

function Dashboard() {

  const [evnets, setEvents] = useState([
    {
      id: 1,
      title: "Event 1",
      date: "2023-01-01",
      time: "10:00",
      duration: 60
    },
    {
      id: 2,
      title: "Event 2",
      date: "2023-01-01",
      time: "10:00",
      duration: 60
    },
    {
      id: 3,
      title: "Event 3",
      date: "2023-01-01",
      time: "10:00",
      duration: 60
    }
  ])

  return (
    <div className={styles.container}>
        <Navbar />
        <main className={styles.main}>
            <h1>Event Types</h1>
            <p>Create events to share for people to book on your calendar. New</p>
            <Link to="/events/new" >Add New Event</Link>
            <div className={styles.eventContainer}>
              {evnets.map((event) => (
                <EventCard key={event.id} title={event.title} date={event.date} time={event.time} duration={event.duration} />
              ))}
            </div>
        </main>
        
    </div>
  )
}

export default Dashboard