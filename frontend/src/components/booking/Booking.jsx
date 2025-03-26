import React, {useState, useEffect} from 'react'
import styles from '../../styles/Booking.module.css'
import axios from 'axios'

import BookingTabs from './BookingTabs';
import BookingList from './BookingList';

function Booking() {
      const [events, setEvents] = useState({}
        );

    const [activeTab, setActiveTab] = useState('upcoming');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [filteredEvents, setFilteredEvents] = useState([])
        
    //Transform the event array as per UI format
    const transformEvents = (eventArray) => {
      return eventArray.map((event) => ({
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
    };

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');
  
        const config = {
          headers: {
            Authorization: `${token}`,
          },
        };
        const response = await axios.get('http://localhost:5000/api/events/userMeetings', config);
        const fetchedEvents = response.data.events || {};
        setEvents(fetchedEvents);
  
        // Set filteredEvents for the current active tab
        const tabEvents = fetchedEvents[activeTab] || [];
        const transformed = transformEvents(tabEvents);
        setFilteredEvents(transformed);
      } catch (err) {
        setError(err.message || 'Failed to fetch events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchEvents();
    }, []);
    const handleTabChange = (tab) => {
      const tabEvents = events[tab] || [];
      const transformed = transformEvents(tabEvents);
      setFilteredEvents(transformed);
      setActiveTab(tab);
    };

  return (
    <div className={styles.cotainer}>
        <div className={styles.bookingHead}>
            <h1 className={styles.heading}>Booking</h1>
            <p>See upcoming and past events booked through your event type links.</p>
        </div>
        <div className={styles.booking}>
            <BookingTabs activeTab={activeTab} onTabChange={handleTabChange} />
            {loading ? (
              <div className={styles.loading}>Loading...</div>
            ) : error ? (
              <div className={styles.error}>{error}</div>
            ) : (
              <BookingList events={filteredEvents} activeTab={activeTab} refetchEvents={fetchEvents} />
            )

            }

        </div>
    </div>
  )
}

export default Booking