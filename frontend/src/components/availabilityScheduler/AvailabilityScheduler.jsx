import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "../../styles/AvailabilityScheduler.module.css";

import Tabs from "./Tabs";
import Dropdowns from "./Dropdowns";
import AvailabilityForm from "./AvailabilityForm";
import CalendarView from "./CalendarView";

function AvailabilityScheduler() {
  const [activeTab, setActiveTab] = useState("Availability");
  const [days, setDays] = useState({});

  const [activity, setActivity] = useState("Event type");
  const [timeZone, setTimeZone] = useState("India Standard Time");
  const [loading, setLoading] = useState(true);
  const [saveTimeout, setSaveTimeout] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `${token}` } };
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/availability`,
          config
        );
        if (response.data.success) {
          setDays(response.data.availability.days);
          setTimeZone(response.data.availability.timeZone);
        }
      } catch (error) {
        console.error("Failed to fetch availability:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, []);

  const saveAvailability = useCallback((updatedDays) => {
    clearTimeout(saveTimeout);
    const newTimeout = setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `${token}` } };

        const filteredDays = Object.keys(updatedDays).reduce((acc, day) => {
          acc[day] = {
            ...updatedDays[day],
            times: updatedDays[day].times.filter(
              (time) => time.start.trim() !== "" && time.end.trim() !== ""
            ),
          };
          return acc;
        }, {});

        const payload = { days: filteredDays, timeZone };
        await axios.put(`${import.meta.env.VITE_API_URL}api/availability`, payload, config);
      } catch (error) {
        console.error("Failed to save availability:", error);
      }
    }, 2000);

    setSaveTimeout(newTimeout);
  }, [timeZone, saveTimeout]);

  const handleDayToggle = (day) => {
    setDays((prev) => {
      const updatedDays = {
        ...prev,
        [day]: { ...prev[day], checked: !prev[day].checked },
      };
      saveAvailability(updatedDays);
      return updatedDays;
    });
  };

  const handleTimeChange = (day, index, field, value) => {
    setDays((prev) => {
      const updatedTimes = [...prev[day].times];
      updatedTimes[index] = { ...updatedTimes[index], [field]: value };
      const updatedDays = {
        ...prev,
        [day]: { ...prev[day], times: updatedTimes },
      };
      saveAvailability(updatedDays);
      return updatedDays;
    });
  };

  const addTimeSlot = (day) => {
    setDays((prev) => {
      const updatedDays = {
        ...prev,
        [day]: {
          ...prev[day],
          times: [...prev[day].times, { start: "", end: "" }],
        },
      };
      saveAvailability(updatedDays);
      return updatedDays;
    });
  };

  const removeTimeSlot = (day, index) => {
    setDays((prev) => {
      const updatedDays = {
        ...prev,
        [day]: {
          ...prev[day],
          times: prev[day].times.filter((_, i) => i !== index),
        },
      };
      saveAvailability(updatedDays);
      return updatedDays;
    });
  };

  if (loading) {
    return <div className={styles.container}>Loading availability...</div>;
  }

  return (
      <div className={styles.main}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.card}>
          <Dropdowns
            activity={activity}
            setActivity={setActivity}
            timeZone={timeZone}
            setTimeZone={(value) => {
              setTimeZone(value);
              saveAvailability();
            }}
          />
          {activeTab === "Availability" ? (
            <AvailabilityForm
              days={days}
              handleDayToggle={handleDayToggle}
              handleTimeChange={handleTimeChange}
              addTimeSlot={addTimeSlot}
              removeTimeSlot={removeTimeSlot}
            />
          ) : (
            <CalendarView days={days} events={[]} />
          )}
        </div>
      </div>
  );
}

export default AvailabilityScheduler;
