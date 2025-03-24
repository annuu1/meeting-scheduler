import React, {useState} from 'react'
import styles from '../../styles/Booking.module.css'

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
            { name: 'Akbar Husain', accepted: true },
            { name: 'Aneesh Menon', accepted: false },
            { name: 'Rahul Saini', accepted: false },
            { name: 'Bharat Thakur', accepted: false },
            { name: 'Natalia', accepted: false },
            { name: 'Alia Toy', accepted: false },
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
              { name: 'Akbar Husain', accepted: true },
              { name: 'Aneesh Menon', accepted: false },
              { name: 'Rahul Saini', accepted: false },
              { name: 'Bharat Thakur', accepted: false },
              { name: 'Natalia', accepted: false },
              { name: 'Alia Toy', accepted: false },
            ],
          },
      ]);

    const [activeTab, setActiveTab] = useState('upcoming')
    const filteredEvents = events.filter(event => event.status === activeTab)

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