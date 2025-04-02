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
      await refetchEvents();
      setShowParticipants(false);
    } catch (err) {
      console.error("Failed to update event status:", err);
      setLocalStatus(activeTab);
    }
  };

  const displayStatus =
    event.participantList.find((p) => {
      return p.userId === userId;
    })?.status || "accepted";

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
              <svg
                width="20"
                height="15"
                viewBox="0 0 20 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.07 6.41001C11.6774 5.56127 12.0041 4.54372 12.0041 3.50001C12.0041 2.45629 11.6774 1.43874 11.07 0.590006C11.6388 0.202537 12.3118 -0.00319486 13 6.27892e-06C13.9283 6.27892e-06 14.8185 0.368755 15.4749 1.02513C16.1313 1.68151 16.5 2.57175 16.5 3.50001C16.5 4.42826 16.1313 5.3185 15.4749 5.97488C14.8185 6.63126 13.9283 7.00001 13 7.00001C12.3118 7.00321 11.6388 6.79747 11.07 6.41001ZM3.5 3.50001C3.5 2.80777 3.70527 2.13108 4.08986 1.55551C4.47444 0.979939 5.02107 0.531335 5.66061 0.266428C6.30015 0.00152138 7.00388 -0.0677903 7.68282 0.067258C8.36175 0.202306 8.98539 0.535649 9.47487 1.02513C9.96436 1.51462 10.2977 2.13826 10.4327 2.81719C10.5678 3.49612 10.4985 4.19986 10.2336 4.8394C9.96867 5.47894 9.52007 6.02557 8.9445 6.41015C8.36892 6.79473 7.69223 7.00001 7 7.00001C6.07174 7.00001 5.1815 6.63126 4.52513 5.97488C3.86875 5.3185 3.5 4.42826 3.5 3.50001ZM5.5 3.50001C5.5 3.79668 5.58797 4.08669 5.7528 4.33336C5.91762 4.58003 6.15189 4.77229 6.42597 4.88583C6.70006 4.99936 7.00166 5.02906 7.29264 4.97118C7.58361 4.91331 7.85088 4.77045 8.06066 4.56067C8.27044 4.35089 8.4133 4.08361 8.47118 3.79264C8.52906 3.50167 8.49935 3.20007 8.38582 2.92598C8.27229 2.65189 8.08003 2.41762 7.83335 2.2528C7.58668 2.08798 7.29667 2.00001 7 2.00001C6.60218 2.00001 6.22064 2.15804 5.93934 2.43935C5.65804 2.72065 5.5 3.10218 5.5 3.50001ZM14 13V15H0V13C0 13 0 9.00001 7 9.00001C14 9.00001 14 13 14 13ZM12 13C11.86 12.22 10.67 11 7 11C3.33 11 2.07 12.31 2 13M13.95 9.00001C14.5629 9.47674 15.064 10.0819 15.4182 10.7729C15.7723 11.4639 15.9709 12.2241 16 13V15H20V13C20 13 20 9.37001 13.94 9.00001H13.95Z"
                  fill="#616161"
                />
              </svg>
            </span>{" "}
            {event.participantCount} people
          </div>
        )}
      </div>
    </div>
  );
}
export default BookingCard;
