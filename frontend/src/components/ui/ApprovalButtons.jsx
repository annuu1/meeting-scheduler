// ApprovalButtons.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/ApprovalButtons.module.css'; // Create a new CSS file for styles
import crossCircle from '../../assets/icons/crossCircle.svg';
import checkMark from '../../assets/icons/checkMark.svg';

const ApprovalButtons = ({ onAccept, onReject }) => {
  return (
    <div className={styles.actionButtons}>
      <button className={`${styles.actions} ${styles.rejectButton}`} onClick={onReject}>
        <img src={crossCircle} className="icon" alt="Reject" />
        Reject
      </button>
      <button className={`${styles.actions} ${styles.acceptButton}`} onClick={onAccept}>
        <img src={checkMark} className="icon" alt="Accept" />
        Accept
      </button>
    </div>
  );
};

ApprovalButtons.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default ApprovalButtons;