import React, { useEffect, useState } from "react";
import EventForm from './EventForm';
import styles from "../../styles/EventList.module.css";
import EventCard from "./EventCard";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

function EventList() {
  const [events, setEvents] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events/', {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (!response.data.success) {
        navigate('/login');
        return;
      }
      const fetchedEvents = response.data.events;
      // Add conflict detection
      const eventsWithConflicts = fetchedEvents.map((event, index) => {
        const eventDateTime = new Date(event.dateTime);
        const eventEndTime = new Date(
          eventDateTime.getTime() + parseInt(event.duration) * 60 * 60 * 1000
        );
        let hasConflict = false;
        for (let i = 0; i < fetchedEvents.length; i++) {
          if (i === index) continue;
          const otherEvent = fetchedEvents[i];
          const otherDateTime = new Date(otherEvent.dateTime);
          const otherEndTime = new Date(
            otherDateTime.getTime() + parseInt(otherEvent.duration) * 60 * 60 * 1000
          );
          if (
            (eventDateTime >= otherDateTime && eventDateTime < otherEndTime) ||
            (eventEndTime > otherDateTime && eventEndTime <= otherEndTime)
          ) {
            hasConflict = true;
            break;
          }
        }
        return { ...event, hasConflict };
      });
      setEvents(eventsWithConflicts);
    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddEvent = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  function minutesToFormattedHours(minutes) {
    const hours = minutes / 60; 
    const wholeHours = Math.floor(hours); 
    const decimalHours = (hours - wholeHours).toFixed(1); 
    if (wholeHours > 0) {
        return wholeHours + (decimalHours > 0 ? decimalHours : ''); 
    } else {
        return decimalHours;
    }
}

const [selectedEvent, setSelectedEvent] = useState(null);

const handleEditEvent = (event) => {
  setSelectedEvent(event);
  setIsModalOpen(true);
};

if(isModalOpen) return <EventForm onClose={handleCloseModal} refetchEvents={fetchData} initialData={selectedEvent}/>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Event Types</h1>
          <p className={styles.headerSubtitle}>
            Create events to share for people to book on your calendar.
          </p>
        </div>
        <button className={styles.addButton} onClick={handleAddEvent} >
          <span className={styles.addIcon}>+</span> Add New Event
        </button>
      </div>
      <div className={styles.eventList}>
        {events.length > 0 ? (
          events.map((event, index) => {
            const startTime = new Date(event.dateTime);
          const endTime = new Date(
            startTime.getTime() + parseInt(event.duration) *60*1000
          );
            return (
            <EventCard
              key={event._id || index}
              title={event.title}
              date={startTime.toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
              })}
              startTime={startTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
              })}
              endTime={endTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
              })}
              description={`${minutesToFormattedHours(event.duration)}hr, ${event.description.slice(0, 50)}`}
              status={event.status}
              id={event._id}
              eventLink = {event.link}
              hasConflict={event.hasConflict}
              refetchEvents={fetchData}
              setIsModalOpen={setIsModalOpen}
              event={event}
              onEdit={handleEditEvent}
            />
          )})
        ) : (
          <div>No events found</div>
        )}
      </div>
    </div>
  );
}

export default EventList;
