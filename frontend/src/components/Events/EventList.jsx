import React, {useState} from 'react'
import styles from '../../styles/EventList.module.css'
import EventCard from './EventCard'

function EventList() {

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
    
    <div>
        <div className={styles.eventContainer}>
              {evnets.map((event) => (
                <EventCard key={event.id} title={event.title} date={event.date} time={event.time} duration={event.duration} />
              ))}
            </div>
    </div>
  )
}

export default EventList