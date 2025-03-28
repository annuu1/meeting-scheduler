import React from 'react';
import styles from "../../styles/Slider.module.css";

function Slider({onChange, checked, width = 50, height = 25 }) {
  return (
    <div className={styles.switchContainer}>
      <label className={styles.switch}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span
          className={styles.slider}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: `${height}px`,
          }}
        ></span>
      </label>
    </div>
  );
}

export default Slider;