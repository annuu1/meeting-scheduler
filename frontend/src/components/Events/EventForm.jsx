import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/EventForm.module.css';
import { showToast } from '../ui/ToastContainer';

const EventForm = ({ onClose, refetchEvents }) => {
  const [formData, setFormData] = useState({
    title: "Event",
    password: "123456",
    hostName: "Sarthak Pal",
    description: "Test Event",
    date: "12/12/25", // DD/MM/YY
    time: "02:30",
    period: "PM",
    timezone: "UTC+5:00 (Delhi)",
    duration: "1 hour",
    backgroundColor: "#000000",
    link: "https://zoom.us",
    emails: "a@gmail.com,b@gmail.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const parseDDMMYY = (dateStr, time, period) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    let hours = parseInt(time.split(':')[0], 10);
    const minutes = parseInt(time.split(':')[1], 10);

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    const fullYear = year < 100 ? 2000 + year : year;
    const date = new Date(fullYear, month - 1, day, hours, minutes);
    
    if (isNaN(date.getTime())) {
      return null; // Invalid date
    }
    return date;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { date, time, period, duration, ...rest } = formData;

    // Parse DD/MM/YY date
    const dateTime = parseDDMMYY(date, time, period);
    if (!dateTime) {
      showToast('Invalid date format. Please use DD/MM/YY (e.g., 12/12/25).', 'error');
      return;
    }
    const durationInMinutes = parseInt(duration.split(' ')[0]) * (duration.includes('hour') ? 60 : 1);

    const payload = {
      ...rest,
      dateTime: dateTime.toISOString(),
      duration: durationInMinutes,
    };

    const token = localStorage.getItem("token");
    if (!token) {
      showToast()('No token found. Please log in.', 'error');
      return;
    }

    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    axios
      .post("http://localhost:5000/api/events", payload, config)
      .then((response) => {
        if (response.data.success) {
          showToast()("Successfully added event", "success"); // Fixed syntax
          refetchEvents();
          onClose();
        } else {
          showToast()(response.data.error, "error"); // Fixed syntax
        }
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.error || 'An error occurred';
        showToast()(errorMessage, "error");
        console.error(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Create Event</h1>
          <p className={styles.headerSubtitle}>
            Create events to share for people to book on your calendar.
          </p>
        </div>
      </div>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Add Event</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Event Topic */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Event Topic <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Set a conference topic before it starts"
              className={styles.input}
              required
            />
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={styles.input}
            />
          </div>

          {/* Host Name */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Host name <span className={styles.required}>*</span>
            </label>
            <select
              name="hostName"
              value={formData.hostName}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="Sarthak Pal">Sarthak Pal</option>
              {/* Add more options if needed */}
            </select>
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textarea}
            />
          </div>

          {/* Date and Time */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Date and time <span className={styles.required}>*</span>
            </label>
            <div className={styles.dateTimeGroup}>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="DD/MM/YY"
                className={styles.inputSmall}
                required
              />
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={styles.selectSmall}
              >
                <option value="02:30">02:30</option>
                {/* Add more time options if needed */}
              </select>
              <select
                name="period"
                value={formData.period}
                onChange={handleChange}
                className={styles.selectSmall}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                className={styles.selectMedium}
              >
                <option value="UTC+5:00 (Delhi)">UTC+5:00 (Delhi)</option>
                {/* Add more timezone options if needed */}
              </select>
            </div>
          </div>

          {/* Set Duration */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Set duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="1 hour">1 hour</option>
              <option value="30 minutes">30 minutes</option>
              <option value="2 hours">2 hours</option>
            </select>
          </div>

          {/* Banner */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Banner</label>
            <div
              className={styles.bannerPreview}
              style={{ backgroundColor: formData.backgroundColor }}
            >
              <div className={styles.bannerContent}>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Avatar"
                  className={styles.bannerAvatar}
                />
                <p className={styles.bannerText}>
                  {formData.title || "Team A Meeting"}
                </p>
              </div>
            </div>
          </div>

          {/* Custom Background Color */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Custom Background Color</label>
            <div className={styles.colorPicker}>
              <div
                className={styles.colorOption}
                style={{ backgroundColor: "#FF5733" }}
              ></div>
              <div
                className={styles.colorOption}
                style={{ backgroundColor: "#FFFFFF" }}
              ></div>
              <div
                className={styles.colorOption}
                style={{ backgroundColor: "#000000" }}
              ></div>
              <input
                type="text"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleChange}
                placeholder="#000000"
                className={styles.colorInput}
              />
            </div>
          </div>

          {/* Add Link */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Add link <span className={styles.required}>*</span>
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Enter URL Here"
              className={styles.input}
              required
            />
          </div>

          {/* Add Emails */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Add Emails <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="emails"
              value={formData.emails}
              onChange={handleChange}
              placeholder="Add member Emails"
              className={styles.input}
              required
            />
          </div>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;