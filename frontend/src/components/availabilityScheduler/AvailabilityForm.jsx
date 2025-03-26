import React from "react";
import styles from "../../styles/AvailabilityScheduler.module.css";

const generateTimeOptions = () => {
  let times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      let hour = h.toString().padStart(2, "0");
      let minute = m.toString().padStart(2, "0");
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

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
                  return (
                    <div key={index} className={styles.timeInputs}>
                      <input
                        type="text"
                        value={time.start}
                        onChange={(e) =>
                          handleTimeChange(day, index, "start", e.target.value)
                        }
                        className={styles.timeInput}
                        placeholder="HH:MM"
                        list={`time-options-${day}-${index}-start`}
                      />
                      <datalist id={`time-options-${day}-${index}-start`}>
                        {timeOptions.map((t, i) => (
                          <option key={i} value={t} />
                        ))}
                      </datalist>

                      <span>-</span>

                      <input
                        type="text"
                        value={time.end}
                        onChange={(e) =>
                          handleTimeChange(day, index, "end", e.target.value)
                        }
                        className={styles.timeInput}
                        placeholder="HH:MM"
                        list={`time-options-${day}-${index}-end`}
                      />
                      <datalist id={`time-options-${day}-${index}-end`}>
                        {timeOptions.map((t, i) => (
                          <option key={i} value={t} />
                        ))}
                      </datalist>

                      <button
                        onClick={() => removeTimeSlot(day, index)}
                        className={styles.removeButton}
                      >
                        ✕
                      </button>
                    </div>
                  );
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
