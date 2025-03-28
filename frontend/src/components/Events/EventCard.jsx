import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls
import styles from "../../styles/EventCard.module.css";

import toggleOn from "../../assets/icons/toggleOn.svg";
import toggleOff from "../../assets/icons/toggleOff.svg";
import copyBtn from "../../assets/icons/copyBtn.svg";
import deleteBtn from "../../assets/icons/deleteBtn.svg";

import Slider from "../ui/Slider";

function EventCard({ title, date, time, description, isActive, id, eventLink, refetchEvents }) {
  const [active, setActive] = useState(isActive); // State for slider

  const token = localStorage.getItem('token'); // Adjust this line based on where the token is stored

  const handleSliderChange = async () => {
    try {
      const newStatus = !active;
      await axios.put(`http://localhost:5000/api/events/${id}`, { isActive: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActive(newStatus);
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  const handleCopyEvent = async () => {
    try {
      await navigator.clipboard.writeText(eventLink);
      alert("Event link copied to clipboard!");
    } catch (error) {
      console.error("Error copying event link:", error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `${token}` }
      });
      alert("Event deleted successfully!");
      refetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  
  return (
    <div className={styles.card}>
      <div className={styles.line}></div>
      <div className={styles.content}>
        <div className={styles.cardHeader}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.editIcon}>✏️</span>
        </div>
        <p className={styles.cardDetails}>
        {date}
        <br />
        {time}
        <br />
        {description}
      </p>
      </div>
      <hr className={styles.divider} />
      <div className={styles.cardFooter}>
        <Slider checked={active} onChange={handleSliderChange} />
        <span className={styles.icon} onClick={handleCopyEvent}>📋</span>
        <img src={deleteBtn} alt="" className={styles.action} onClick={handleDeleteEvent} />
      </div>
    </div>
  );
}

export default EventCard;
