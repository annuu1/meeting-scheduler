import React, {useState, useEffect} from 'react'
import styles from '../../styles/Booking.module.css'
import axios from 'axios'

import BookingTabs from './BookingTabs';
import BookingList from './BookingList';

function Booking() {
      const [events, setEvents] = useState({}
        );

    const [activeTab, setActiveTab] = useState('pending')
    const [error, setError] = useState('')
    const [filteredEvents, setFilteredEvents] = useState([])

  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              Authorization: `${token}`,
            },
          };
          const response = await axios.get('http://localhost:5000/api/events/userMeetings', config);
          // console.log(response.data.events)
    
          setEvents(response.data.events);
        } catch (err) {
          setError('Failed to fetch events. Please try again later.');
        }
      };

      fetchEvents();
    }, []);
    const handleTabChange = (tab) => {
      // console.log(events)
      // Transform the API response to match the UI format
      const transformedEvents = events[tab].map((event) => ({
        id: event._id,
        date: new Date(event.dateTime).toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
        }),
        time: `${new Date(event.dateTime).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
        })} - ${new Date(
          new Date(event.dateTime).getTime() + event.duration * 60000
        ).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`,
        title: event.title,
        participants: event.participants,
        status: event.status,
        participantCount: event.participants.length,
        participantList: event.participants.map((p) => ({
          name: p.name,
          status: p.status,
          userId: p.user.id,
        })),
      }));
      console.log(transformedEvents)

      setFilteredEvents(transformedEvents);
        setActiveTab(tab);
      };

  return (
    <div className={styles.cotainer}>
        <div className={styles.bookingHead}>
            <h1>Booking</h1>
            <p>See upcoming and past events booked through your event type links.</p>
        </div>
        <div className={styles.booking}>
            <BookingTabs activeTab={activeTab} onTabChange={handleTabChange} />
            <BookingList events={filteredEvents} activeTab={activeTab} />

        </div>
    </div>
  )
}

export default Booking