import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/EventForm.module.css';
import { showToast } from '../ui/ToastContainer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import avatar from '../../assets/icons/avatar.png';
import editBtn from '../../assets/icons/editBtn.svg';

const EventForm = () => {
  const { id } = useParams(); // Event ID for editing
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isBannerEditable, setIsBannerEditable] = useState(false);

  const isEditMode = !!id || !!location.state?.event; // Determine if we're editing

  const [formData, setFormData] = useState({
    title: "",
    password: "",
    hostName: JSON.parse(localStorage.getItem("user"))?.name || "Unknown Host",
    description: "",
    date: "",
    time: "",
    period: "AM",
    timezone: "UTC+5:00 (Delhi)",
    duration: "1 hour",
    backgroundColor: "#000000",
    link: "",
    emails: "",
    bannerText: "",
  });

  const formatDateToDDMMYY = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year.slice(-2)}`;
  };

  useEffect(() => {
    if (isEditMode && location.state?.event) {
      const event = location.state.event;
      const dateObj = new Date(event.dateTime);

      setFormData({
        title: event.title || '',
        // password: event.password || '',
        hostName: event.hostName || JSON.parse(localStorage.getItem("user"))?.name || "Unknown Host",
        description: event.description || '',
        date: formatDateToDDMMYY(dateObj.toISOString().split("T")[0]) || '',
        time: dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }).split(" ")[0] || "",
        period: dateObj.toLocaleTimeString().includes("AM") ? "AM" : "PM",
        timezone: event.timezone || 'UTC+5:00 (Delhi)',
        duration: event.duration ? `${Math.floor(event.duration / 60) || 1} hour${event.duration >= 120 ? 's' : ''}` : '1 hour',
        backgroundColor: event.backgroundColor || '#000000',
        link: event.link || '',
        bannerText: event.bannerText || event.title || '',
        emails: event.participants?.map((p) => p.user.email).join(",") || '',
      });
    }
  }, [location.state, isEditMode]);

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

    return isNaN(date.getTime()) ? null : date;
  };

  const handleNextStep = (event) => {
    event.preventDefault();

    const { date, time, period, title, hostName } = formData;
    const dateTime = parseDDMMYY(date, time, period);

    if (!dateTime) {
      showToast()('Invalid date format. Please use DD/MM/YY (e.g., 12/12/25).', 'error');
      return;
    }

    if (!title || !hostName) {
      showToast()('Please fill all required fields.', 'error');
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { date, time, period, duration, ...rest } = formData;
    const dateTime = parseDDMMYY(date, time, period);

    if (!dateTime) {
      showToast()('Invalid date format. Please use DD/MM/YY (e.g., 12/12/25).', 'error');
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

    try {
      let response;
      if (isEditMode) {
        // Update existing event
        response = await axios.put(`http://localhost:5000/api/events/${id || location.state.event._id}`, payload, config);
      } else {
        // Create new event
        response = await axios.post("http://localhost:5000/api/events", payload, config);
      }

      if (response.data.success) {
        showToast()(`Successfully ${isEditMode ? 'updated' : 'added'} event`, "success");
        navigate("/dashboard/events");
      } else {
        showToast()(response.data.error || `Failed to ${isEditMode ? 'update' : 'add'} event`, "error");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || `An error occurred while ${isEditMode ? 'updating' : 'adding'} the event`;
      showToast()(errorMessage, "error");
      console.error("Error submitting event:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>{isEditMode ? 'Edit Event' : 'Add Event'}</h2>
        <hr className={styles.modalHr} />

        {step === 1 ? (
          <form onSubmit={handleNextStep} className={styles.form}>
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
                <option value={formData.hostName}>{formData.hostName}</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
              />
            </div>

            <hr className={styles.modalHr} />

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
                <input
                  type="text"
                  list="timeOptions"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`${styles.select} ${styles.selectMedium}`}
                  required
                  placeholder="HH:MM"
                />
                <datalist id="timeOptions">
                  {Array.from({ length: 12 * 4 }, (_, i) => {
                    const hours = Math.floor(i / 4);
                    const minutes = (i % 4) * 15;
                    const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
                    return <option key={timeString} value={timeString} />;
                  })}
                </datalist>
                <select
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  className={`${styles.selectSmall} ${styles.select}`}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className={`${styles.selectLarge} ${styles.select}`}
                >
                  <option value="UTC+5:00 (Delhi)">UTC+5:00 (Delhi)</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Set duration</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
              </select>
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button type="submit" className={styles.saveButton}>
                Next
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={`${styles.formGroup} ${styles.banner}`}>
              <label className={styles.label}>Banner</label>
              <div
                className={styles.bannerPreview}
                style={{ backgroundColor: formData.backgroundColor }}
              >
                <div className={styles.bannerContent}>
                  <img src={avatar} alt="Avatar" className={styles.bannerAvatar} />
                  <img
                    src={editBtn}
                    className={styles.editButton}
                    onClick={() => setIsBannerEditable(!isBannerEditable)}
                    alt="Edit"
                  />
                  <input
                    type="text"
                    name="bannerText"
                    className={`${styles.bannerText} ${isBannerEditable ? styles.editable : ''}`}
                    disabled={!isBannerEditable}
                    value={formData.bannerText}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.colorOptionWrapper}>
                <label className={styles.label}>Custom Background Color</label>
                <div className={styles.colorPicker}>
                  <div
                    className={styles.colorOption}
                    style={{ backgroundColor: "#EF6500" }}
                    onClick={() => setFormData((prev) => ({ ...prev, backgroundColor: "#EF6500" }))}
                  ></div>
                  <div
                    className={styles.colorOption}
                    style={{ backgroundColor: "#FFFFFF" }}
                    onClick={() => setFormData((prev) => ({ ...prev, backgroundColor: "#FFFFFF" }))}
                  ></div>
                  <div
                    className={styles.colorOption}
                    style={{ backgroundColor: "#000000" }}
                    onClick={() => setFormData((prev) => ({ ...prev, backgroundColor: "#000000" }))}
                  ></div>
                </div>
                <div className={styles.colorPickerWrapper}>
                  <input
                    type="color"
                    name="backgroundColor"
                    value={formData.backgroundColor}
                    onChange={handleChange}
                    className={styles.colorPickerInput}
                  />
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
            </div>

            <hr className={styles.modalHr} />

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

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className={styles.cancelButton}
              >
                Back
              </button>
              <button type="submit" className={styles.saveButton}>
                {isEditMode ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventForm;