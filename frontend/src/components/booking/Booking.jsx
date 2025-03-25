import React, {useState, useEffect} from 'react'
import styles from '../../styles/Booking.module.css'
import axios from 'axios'

import BookingTabs from './BookingTabs';
import BookingList from './BookingList';

function Booking() {
      const [events, setEvents] = useState([
        {
          id: 1,
          date: 'Friday, 28 Feb',
          time: '2:35 PM - 3:00 PM',
          title: 'Appointment',
          participants: ['You', 'Dr. Kumar'],
          status: 'cancelled',
        },
        {
          id: 2,
          date: 'Friday, 28 Feb',
          time: '1:30 PM - 2:30 PM',
          title: 'Meeting-2',
          participants: ['You', 'Team 2'],
          participantCount: 13,
          status: 'upcoming',
        },
        {
          id: 3,
          date: 'Friday, 28 Feb',
          time: '10:30 AM - 12:30 PM',
          title: 'Meeting',
          participants: ['You', 'Team 1'],
          participantCount: 4,
          status: 'pending',
          participantList: [
            { name: 'Akbar Husain', status: "pending" },
            { name: 'Aneesh Menon', status: "pending" },
            { name: 'Rahul Saini', status: "pending" },
            { name: 'Bharat Thakur', status: "pending" },
            { name: 'Natalia', status: "pending" },
            { name: 'Alia Toy', status: "pending" },
          ],
        },
        {
            id: 4,
            date: 'Friday, 28 Feb',
            time: '10:30 AM - 12:30 PM',
            title: 'Meeting',
            participants: ['You', 'Team 1'],
            participantCount: 4,
            status: 'pending',
            participantList: [
              { name: 'Akbar Husain', status: "pending" },
              { name: 'Aneesh Menon', status: "pending" },
              { name: 'Rahul Saini', status: "pending" },
              { name: 'Bharat Thakur', status: "pending" },
              { name: 'Natalia', status: "pending" },
              { name: 'Alia Toy', status: "pending" },
            ],
          },
      ]);

    const [activeTab, setActiveTab] = useState('upcoming')
    const [error, setError] = useState('')
    const filteredEvents = events.filter(event => event.status === activeTab)
  
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
          const data = response.data;
          console.log(data);
    
          // Transform the API response to match the UI format
          const transformedEvents = response.data.events.map((event) => ({
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
              userId: p.user._id,
            })),
          }));
    
          setEvents(transformedEvents);
        } catch (err) {
          setError('Failed to fetch events. Please try again later.');
        }
      };
      
      fetchEvents();
    }, []);
    const handleTabChange = (tab) => {
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
            <BookingList events={filteredEvents} />

        </div>
    </div>
  )
}

export default Booking