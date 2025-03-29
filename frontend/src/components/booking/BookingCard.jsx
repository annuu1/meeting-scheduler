import React, {useState} from "react";
import axios from 'axios';
import styles from "../../styles/BookingCard.module.css";

import ParticipantDropdown from "./ParticipantDropdown";

function BookingCard({ event,  activeTab, refetchEvents }) {
    const [showParticipants, setShowParticipants] = useState(false);
    const [localStatus, setLocalStatus] = useState(activeTab);

    const handleEventAction = async (action) => {
      const newStatus = action === 'accept' ? 'accepted' : 'rejected';
        try {
          setLocalStatus(newStatus);
          setShowParticipants(false);

          const token = localStorage.getItem('token');
          const config = {
            headers: {
              Authorization: `${token}`,
            },
          };
          await axios.put(
            `http://localhost:5000/api/events/status/${event.id}`,
            { status: action === 'accept' ? 'accepted' : 'rejected' },
            config
          );
          // refetch the events
          await refetchEvents();
          setShowParticipants(false);
        } catch (err) {
          console.error('Failed to update event status:', err);
          setLocalStatus(activeTab);
        }
      };

      const displayStatus = localStatus || activeTab;


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
        {activeTab === "pending" ? (
            <>
            {/* <button className={styles.participantButton} onClick={() => setShowParticipants(!showParticipants)}>
                Participant ({event.participantList?.length || 0})
            </button> */}
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
            
            <button
            className={`${styles.statusButton} ${
              displayStatus === "upcoming" ? styles.accepted : styles.rejected
            }`}
          >
            {displayStatus === "upcoming" ? "Accepted" : "Rejected"}
          </button>
            </>
        )}
        {event.participantCount && activeTab !== "cancelled" && (
          <div className={styles.participantCount} 
          onMouseOver={() => setShowParticipants(!showParticipants)} 
          onMouseLeave={() => setShowParticipants(!showParticipants)}
          >
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
