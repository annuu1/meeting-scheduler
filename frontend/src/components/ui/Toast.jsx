import { useEffect } from 'react';
import styles from '../../styles/Toast.module.css';

const Toast = ({ message, type = 'success', duration = 3000, width = 200, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span className={styles.message} style={{width: `${width}px`}}>{message}</span>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Toast;