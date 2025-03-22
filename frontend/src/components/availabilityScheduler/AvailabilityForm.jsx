import React from "react";
import styles from "../../styles/AvailabilityScheduler.module.css";

function AvailabilityForm({
  days,
  handleDayToggle,
  handleTimeChange,
  addTimeSlot,
  removeTimeSlot,
}) {
  return (
    <div>
      <h2 className={styles.sectionTitle}>Weekly hours</h2>

      {Object.keys(days).map((day) => (
        <div key={day} className={styles.dayRow}>
          <input
            type="checkbox"
            checked={days[day].checked}
            onChange={() => handleDayToggle(day)}
          />
          <span className={styles.dayLabel}>{day}</span>
          {days[day].checked ? (
            <div className={styles.timeInputs}>
              {days[day].times.length === 0 ? (
                <span className={styles.unavailableText}>Unavailable</span>
              ) : (
                days[day].times.map((time, index) => {
                    return(
                  <div key={index} className={styles.timeInputs}>
                    <input
                      type="time"
                      value={time.start}
                      onChange={(e) =>
                        handleTimeChange(day, index, "start", e.target.value)
                      }
                      className={styles.timeInput}
                    />
                    <span>-</span>
                    <input
                      type="time"
                      value={time.end}
                      onChange={(e) =>
                        handleTimeChange(day, index, "end", e.target.value)}
                        className={styles.timeInput}
                    />
                    <button
                      onClick={() => removeTimeSlot(day, index)}
                      className={styles.removeButton}
                    >
                      ✕
                    </button>
                  </div>)
                })
              )}
              <button onClick={() => addTimeSlot(day)} className={styles.addButton}>
                +
              </button>
            </div>
          ) : (
            <span className={styles.unavailableText}>Unavailable</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default AvailabilityForm;
