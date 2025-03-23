import React, { useState } from "react";
import styles from "../../styles/EventCard.module.css";

import toggleOn from "../../assets/icons/toggleOn.svg";
import toggleOff from "../../assets/icons/toggleOff.svg";
import copyBtn from "../../assets/icons/copyBtn.svg";
import deleteBtn from "../../assets/icons/deleteBtn.svg";

function EventCard({ title, date, time, description, isActive }) {
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
        <img src={toggleOn} alt="" className={styles.action} />
        <span className={styles.icon}>📋</span>
        <img src={deleteBtn} alt="" className={styles.action} />
      </div>
    </div>
  );
}

export default EventCard;
