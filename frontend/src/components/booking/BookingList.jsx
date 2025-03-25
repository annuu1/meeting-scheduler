// src/components/Booking/BookingList.js
import React from 'react';
import BookingCard from './BookingCard';
import styles from '../../styles/BookingList.module.css';

const BookingList = ({ events, activeTab }) => {
  return (
    <div className={styles.bookingList}>
      {events.length === 0 ? (
        <p>No events found for this status.</p>
      ) : (
        events.map((event) => <BookingCard key={event.id} event={event} activeTab={activeTab}/>)
      )}
    </div>
  );
};

export default BookingList;