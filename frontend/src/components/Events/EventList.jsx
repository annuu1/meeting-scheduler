import React, {useEffect, useState} from 'react'
import styles from '../../styles/EventList.module.css'
import EventCard from './EventCard'
import axios from 'axios'

import { Link } from 'react-router-dom'

function EventList() {

      const [events, setEvents] = useState([
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

      const token = localStorage.getItem('token')

      useEffect(()=>{
        const fetchData = ()=>{
          axios.get("http://localhost:5000/api/events/", {
            headers:{
              Authorization: `${token}`
            }
          })
          .then((response)=>{ 
            setEvents(response.data.events)})
        }
        fetchData()
      }, [])

  return (
    
    <div>
      <h1>Event Types</h1>
      <p>Create events to share for people to book on your calendar. New</p>
      <Link to="/events/new" >Add New Event</Link>
        <div className={styles.eventContainer}>
        {events.length > 0 ? (
    events.map((event) => (
      <EventCard 
        key={event.id} 
        title={event.title} 
        date={event.date} 
        time={event.time} 
        duration={event.duration} 
      />
    ))
  ) : (
    <div>No events found</div>
  )}
            </div>
    </div>
  )
}

export default EventList
