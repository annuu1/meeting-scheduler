import React from 'react';
import styles from '../../styles/AvailabilityScheduler.module.css'

const CalendarView = ({ days, events }) => {
  const timeToRow = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours - 9) * 2 + (minutes / 30) + 2;
  };

  const timeToSpan = (start, end) => {
    const startMinutes = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
    const endMinutes = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);
    return (endMinutes - startMinutes) / 30;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = ['23', '24', '25', '26', '27', '28', '1'];

  return (
    <div>
      <div className={styles.calendarControls}>
        <div className={styles.navButtons}>
          <button className={styles.navButton}>{'<'}</button>
          <button className={styles.navButton}>Today</button>
          <button className={styles.navButton}>{'>'}</button>
        </div>
        <div className={styles.viewButtons}>
          <button className={styles.viewButton}>Day</button>
          <button className={`${styles.viewButton} ${styles.active}`}>Week</button>
          <button className={styles.viewButton}>Month</button>
          <button className={styles.viewButton}>Year</button>
        </div>
        <div>
          <input type="text" placeholder="Search" className={styles.searchInput} />
        </div>
      </div>

      <div className={styles.calendarGrid}>
        <div className={styles.timeColumn}>
          <div className={styles.timeHeader}></div>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.timeSlot}>
              {i + 9} {i + 9 < 12 ? 'AM' : 'PM'}
            </div>
          ))}
        </div>

        {weekDays.map((day, index) => (
          <div key={day} className={styles.dayColumn}>
            <div className={styles.dayHeader}>
              {day} {dates[index]}
            </div>
            <div className={styles.dayGrid}>
              {days[day].checked &&
                days[day].times.map((time, i) => (
                  <div
                    key={i}
                    className={styles.availabilitySlot}
                    style={{
                      gridRowStart: timeToRow(time.start),
                      gridRowEnd: `span ${timeToSpan(time.start, time.end)}`,
                    }}
                  ></div>
                ))}

              {events
                .filter((event) => event.day === day)
                .map((event, i) => (
                  <div
                    key={i}
                    className={`${styles.eventSlot} ${
                      event.title === 'Meeting 2' ? styles.meeting2 : styles.meeting
                    }`}
                    style={{
                      gridRowStart: timeToRow(event.start),
                      gridRowEnd: `span ${timeToSpan(event.start, event.end)}`,
                    }}
                  >
                    {event.start} - {event.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
        <div className={styles.timeZoneIndicator}>EST (GMT-5)</div>
      </div>
    </div>
  );
};

export default CalendarView;