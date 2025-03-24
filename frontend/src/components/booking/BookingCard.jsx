import React, {useState} from "react";
import axios from 'axios';
import styles from "../../styles/BookingCard.module.css";

import ParticipantDropdown from "./ParticipantDropdown";

function BookingCard({ event }) {
    const [showParticipants, setShowParticipants] = useState(false);

    const handleEventAction = async (action) => {
        try {
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              Authorization: `${token}`,
            },
          };
          await axios.put(
            `http://localhost:5000/api/events/${event.id}`,
            { status: action === 'accept' ? 'upcoming' : 'cancelled' },
            config
          );
          // Optionally, refetch events or update the local state
          setShowParticipants(false);
        } catch (err) {
          console.error('Failed to update event status:', err);
        }
      };


  return (
    <div className={styles.eventCard}>
      <div className={styles.eventDetails}>
        <div className={styles.eventDateTime}>
          <p>{event.date}</p>
          <p>{event.time}</p>
        </div>
        <div className={styles.eventInfo}>
          <p className={styles.eventTitle}>{event.title}</p>
          <p>{event.participants.join(" and ")}</p>
        </div>
      </div>

      <div className={styles.eventActions}>
        {event.status === "pending" ? (
            <>
            <button className={styles.participantButton} onClick={() => setShowParticipants(!showParticipants)}>
                Participant ({event.participantList?.length || 0})
            </button>
            {showParticipants && (
              <ParticipantDropdown
                participants={event.participantList || []}
                onAccept={() => handleEventAction('accept')}
                onReject={() => handleEventAction('reject')}
              />
            )}
            </>
        ) : (
            <>
            <button className={styles.statusButton}>
                {event.status === "upcoming" ? "Accepted" : "Rejected"}
            </button>
            </>
        )}
        {event.participantCount && (
          <div className={styles.participantCount}>
            <span role="img" aria-label="people">
              👥
            </span>{' '}
            {event.participantCount} people
          </div>
        )}

      </div>
    </div>
  );
}
export default BookingCard;
