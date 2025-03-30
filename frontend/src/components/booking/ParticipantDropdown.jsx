import React from "react";
import PropTypes from "prop-types";
import styles from "../../styles/ParticipantDropdown.module.css";

import avatar from "../../assets/icons/avatar.png";
import crossCircle from "../../assets/icons/crossCircle.svg";
import checkMark from "../../assets/icons/checkMark.svg";
import ApprovalButtons from "../ui/ApprovalButtons";

const ParticipantDropdown = ({ participants, onAccept, onReject }) => {
  return (
    <div className={styles.participantDropdown}>
      <div className={styles.participantHeader}>
        <div className= {styles.participantTitle}><p>Participants</p> <span className={styles.participantCount}> ({participants.length})</span></div>
        <ApprovalButtons onAccept={onAccept} onReject={onReject} />
      </div>
      <div className={styles.participantList}>
        {participants.map((participant, index) => (
          <div key={index} className={styles.participantItem}>
            <img
              src={avatar}
              alt="Participant Avatar"
              className={styles.participantAvatar}
            />
            <span>{participant.name}</span>
            <input
              type="checkbox"
              checked={participant.status === "accepted"}
              readOnly
              disabled
              className={styles.participantCheckbox}
            />
          </div>
        ))}
      </div>
    </div>
  );                
};

ParticipantDropdown.propTypes = {
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      accepted: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default ParticipantDropdown;
