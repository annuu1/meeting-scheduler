import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/EventForm.module.css';

const EventForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    eventTopic: "",
    password: "",
    hostName: "Sarthak Pal", // Default value as shown in the image
    description: "",
    date: "",
    time: "02:30",
    period: "PM",
    timezone: "UTC+5:00 (Delhi)",
    duration: "1 hour",
    backgroundColor: "#000000",
    link: "",
    emails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    axios
      .post("http://localhost:5000/api/events", formData, config)
      .then((response) => {
        console.log(response);
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Add Event</h2>
        <form onSubmit={handleSubmit}>
          {/* Event Topic */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Event Topic <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="eventTopic"
              value={formData.eventTopic}
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
                placeholder="dd/mm/yy"
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
                  {formData.eventTopic || "Team A Meeting"}
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
