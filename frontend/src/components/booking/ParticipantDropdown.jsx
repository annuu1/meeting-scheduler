// src/components/Booking/ParticipantDropdown.js
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/ParticipantDropdown.module.css';

const ParticipantDropdown = ({ participants, onAccept, onReject }) => {
  return (
    <div className={styles.participantDropdown}>
      <div className={styles.participantHeader}>
        <span>Participant ({participants.length})</span>
      </div>
      <div className={styles.participantList}>
        {participants.map((participant, index) => (
          <div key={index} className={styles.participantItem}>
            <img
              src="https://via.placeholder.com/30"
              alt="Participant Avatar"
              className={styles.participantAvatar}
            />
            <span>{participant.name}</span>
            <input
              type="checkbox"
              checked={participant.accepted}
              readOnly
              className={styles.participantCheckbox}
            />
          </div>
        ))}
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.rejectButton} onClick={onReject}>
          Reject
        </button>
        <button className={styles.acceptButton} onClick={onAccept}>
          Accept
        </button>
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