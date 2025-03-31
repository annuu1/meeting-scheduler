import React, { act, useState } from "react";
import axios from "axios";
import styles from "../../styles/BookingCard.module.css";

import ParticipantDropdown from "./ParticipantDropdown";

function BookingCard({ event, activeTab, refetchEvents }) {
  const [showParticipants, setShowParticipants] = useState(false);
  const [localStatus, setLocalStatus] = useState(activeTab);

  const userId = JSON.parse(localStorage.getItem("user")).id;
  const handleEventAction = async (action) => {
    const newStatus = action === "accept" ? "accepted" : "rejected";
    try {
      setLocalStatus(newStatus);
      setShowParticipants(false);

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/events/status/${event.id}`,
        { status: action === "accept" ? "accepted" : "rejected" },
        config
      );
      // refetch the events
      await refetchEvents();
      setShowParticipants(false);
    } catch (err) {
      console.error("Failed to update event status:", err);
      setLocalStatus(activeTab);
    }
  };

  //setting status, if user is creator, get accepted
  const displayStatus =
    event.participantList.find((p) => {
      return (p.userId === userId)
    })?.status ||
    "accepted";

  return (
    <div className={styles.eventCard}>
      <div className={styles.eventDetails}>
        <div className={styles.eventDateTime}>
          <p>{event.date}</p>
          <p>{event.time}</p>
        </div>
        <div className={styles.eventInfo}>
          <p className={styles.eventTitle}>{event.title}</p>
          <p>{"You and " + event.participantCount + " others"}</p>
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
                onAccept={() => handleEventAction("accept")}
                onReject={() => handleEventAction("reject")}
              />
            )}
          </>
        ) : activeTab === "past" ? (
          displayStatus === "pending" ? (
            <>
              {showParticipants && (
                <ParticipantDropdown
                  participants={event.participantList || []}
                  onAccept={() => handleEventAction("accept")}
                  onReject={() => handleEventAction("reject")}
                />
              )}
            </>
          ) : (
            <>
              <button
                className={`${styles.statusButton} ${
                  displayStatus === "accepted"
                    ? styles.accepted
                    : styles.rejected
                }`}
              >
                {displayStatus === "accepted" ? "Accepted" : "Rejected"}
              </button>
            </>
          )
        ) : (
          <>
            <button
              className={`${styles.statusButton} ${
                activeTab === "upcoming" ? styles.accepted : styles.rejected
              }`}
            >
              {activeTab === "upcoming" ? "Accepted" : "Rejected"}
            </button>
          </>
        )}
        {event.participantCount && activeTab !== "cancelled" && (
          <div
            className={styles.participantCount}
            onMouseOver={() => setShowParticipants(!showParticipants)}
          >
            <span role="img" aria-label="people">
              👥
            </span>{" "}
            {event.participantCount} people
          </div>
        )}
      </div>
    </div>
  );
}
export default BookingCard;
