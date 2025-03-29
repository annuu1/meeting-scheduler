import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/EventCard.module.css";
import { showToast } from "../ui/ToastContainer";

import copyBtn from "../../assets/icons/copyBtn.svg";
import deleteBtn from "../../assets/icons/deleteBtn.svg";
import editBtn from "../../assets/icons/editBtn.svg";

import Slider from "../ui/Slider";

function EventCard({ title, date, time, description, status, id, eventLink, refetchEvents }) {
  const [active, setActive] = useState(status);
  const token = localStorage.getItem('token');

  const handleSliderChange = async () => {
    try {
      const newStatus = active === "active" ? "deactivated" : "active";
      await axios.put(`http://localhost:5000/api/events/${id}`, { status: newStatus }, {
        headers: { Authorization: `${token}` }
      });
      setActive(newStatus);
      showToast()(`Event ${newStatus}`);
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  const handleCopyEvent = async () => {
    try {
      await navigator.clipboard.writeText(eventLink);
      showToast()("Event link copied to clipboard!");
    } catch (error) {
      showToast()(error.message, "error");
      console.error("Error copying event link:", error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `${token}` }
      });
      showToast()("Event deleted successfully!");
      refetchEvents();
    } catch (error) {
      showToast()(error.message, "error");
      console.error("Error deleting event:", error);
    }
  };
  
  return (
    <div className={styles.card}>
      <div className={`${styles.line } ${styles[active]}`}></div>
      <div className={styles.content}>
        <div className={styles.cardHeader}>
          <p className={styles.title}>{title}</p>
          <img src={editBtn} alt="" className={styles.action} />
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
        <Slider  checked={active==="active"} onChange={handleSliderChange} />
        {/* <span className={styles.icon} onClick={handleCopyEvent}>📋</span> */}
        <img src={copyBtn} alt="" className={styles.action} onClick={handleCopyEvent} />
        <img src={deleteBtn} alt="" className={styles.action} onClick={handleDeleteEvent} />
      </div>
    </div>
  );
}

export default EventCard;
