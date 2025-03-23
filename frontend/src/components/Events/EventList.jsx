import React, { useEffect, useState } from "react";
import EventForm from './EventForm';
import styles from "../../styles/EventList.module.css";
import EventCard from "./EventCard";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

function EventList() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Event 1",
      date: "2023-01-01",
      time: "10:00",
      duration: 60,
      isActive: true,
    }, 
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddEvent = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5000/api/events/", {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          if (!response.data.success) {
            navigate("/login");
          }
          console.log(response.data.events);
          setEvents(response.data.events);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchData();
  }, []);

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
          events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              date={event.dateTime}
              time={event.time}
              description={event.duration}
              isActive={event.isActive}
            />
          ))
        ) : (
          <div>No events found</div>
        )}
      </div>
      {isModalOpen && <EventForm onClose={handleCloseModal} />}
    </div>
  );
}

export default EventList;
