import React, { useState } from 'react';
import styles from '../../styles/Test.module.css';

const AvailabilityScheduler = () => {
  const [activeTab, setActiveTab] = useState('Availability');
  const [days, setDays] = useState({
    Sun: { checked: false, times: [] },
    Mon: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
    Tue: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
    Wed: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
    Thu: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
    Fri: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
    Sat: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
  });
  const [activity, setActivity] = useState('Event type');
  const [timeZone, setTimeZone] = useState('India Standard Time');

  const events = [
    { day: 'Thu', start: '10:00', end: '11:00', title: 'Meeting 2' },
    { day: 'Fri', start: '09:00', end: '10:00', title: 'Meeting' },
    { day: 'Fri', start: '14:00', end: '15:00', title: 'Meeting 2' },
  ];

  const handleDayToggle = (day) => {
    setDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], checked: !prev[day].checked },
    }));
  };

  const handleTimeChange = (day, index, field, value) => {
    const updatedTimes = [...days[day].times];
    updatedTimes[index] = { ...updatedTimes[index], [field]: value };
    setDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], times: updatedTimes },
    }));
  };

  const addTimeSlot = (day) => {
    setDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], times: [...prev[day].times, { start: '', end: '' }] },
    }));
  };

  const removeTimeSlot = (day, index) => {
    const updatedTimes = days[day].times.filter((_, i) => i !== index);
    setDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], times: updatedTimes },
    }));
  };

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
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
          <span className={styles.logoText}>CNNCT</span>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <a href="#" className={styles.navItem}>
                <span className={styles.navItemIcon}>📅</span> Events
              </a>
            </li>
            <li>
              <a href="#" className={`${styles.navItem} ${styles.active}`}>
                <span className={styles.navItemIcon}>⏰</span> Availability
              </a>
            </li>
            <li>
              <a href="#" className={styles.navItem}>
                <span className={styles.navItemIcon}>⚙️</span> Settings
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.userProfile}>
          <img src="/avatar.png" alt="User" className={styles.userAvatar} />
          <span className={styles.userName}>Sarthak Pal</span>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        <h1 className={styles.header}>Availability</h1>
        <p className={styles.subHeader}>Configure times when you are available for bookings</p>

        <div className={styles.tabContainer}>
          <button
            onClick={() => setActiveTab('Availability')}
            className={`${styles.tab} ${activeTab === 'Availability' ? styles.active : ''}`}
          >
            Availability
          </button>
          <button
            onClick={() => setActiveTab('Calendar View')}
            className={`${styles.tab} ${activeTab === 'Calendar View' ? styles.active : ''}`}
          >
            Calendar View
          </button>
        </div>

        {activeTab === 'Availability' ? (
          <div className={styles.card}>
            <div className={styles.dropdownContainer}>
              <div className={styles.dropdownWrapper}>
                <label className={styles.dropdownLabel}>Activity</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className={styles.dropdown}
                >
                  <option>Event type</option>
                  <option>Meeting</option>
                  <option>Call</option>
                </select>
              </div>
              <div className={styles.dropdownWrapper}>
                <label className={styles.dropdownLabel}>Time Zone</label>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className={styles.dropdown}
                >
                  <option>India Standard Time</option>
                  <option>UTC</option>
                  <option>Eastern Standard Time</option>
                </select>
              </div>
            </div>

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
                      days[day].times.map((time, index) => (
                        <div key={index} className={styles.timeInputs}>
                          <input
                            type="time"
                            value={time.start}
                            onChange={(e) =>
                              handleTimeChange(day, index, 'start', e.target.value)
                            }
                            className={styles.timeInput}
                          />
                          <span>-</span>
                          <input
                            type="time"
                            value={time.end}
                            onChange={(e) =>
                              handleTimeChange(day, index, 'end', e.target.value)
                            }
                            className={styles.timeInput}
                          />
                          <button
                            onClick={() => removeTimeSlot(day, index)}
                            className={styles.removeButton}
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    )}
                    <button
                      onClick={() => addTimeSlot(day)}
                      className={styles.addButton}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <span className={styles.unavailableText}>Unavailable</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.card}>
            <div className={styles.dropdownContainer}>
              <div className={styles.dropdownWrapper}>
                <label className={styles.dropdownLabel}>Activity</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className={styles.dropdown}
                >
                  <option>Event type</option>
                  <option>Meeting</option>
                  <option>Call</option>
                </select>
              </div>
              <div className={styles.dropdownWrapper}>
                <label className={styles.dropdownLabel}>Time Zone</label>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className={styles.dropdown}
                >
                  <option>India Standard Time</option>
                  <option>UTC</option>
                  <option>Eastern Standard Time</option>
                </select>
              </div>
            </div>

            <div className={styles.calendarControls}>
              <div className={styles.navButtons}>
                <button className={styles.navButton}>{'<'}</button>
                <button className={styles.navButton}>Today</button>
                <button className={styles.navButton}>{'>'}</button>
              </div>
              <div className={styles.viewButtons}>
                <button className={styles.viewButton}>Day</button>
                <button className={`${styles.viewButton} ${styles.active}`}>
                  Week
                </button>
                <button className={styles.viewButton}>Month</button>
                <button className={styles.viewButton}>Year</button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search"
                  className={styles.searchInput}
                />
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
                            event.title === 'Meeting 2'
                              ? styles.meeting2
                              : styles.meeting
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
        )}
      </div>
    </div>
  );
};

export default AvailabilityScheduler;