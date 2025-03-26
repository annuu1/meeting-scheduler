import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../../styles/AvailabilityScheduler.module.css'

import Tabs from './Tabs';
import Dropdowns from './Dropdowns';
import AvailabilityForm from './AvailabilityForm';
import CalendarView from './CalendarView';

function AvailabilityScheduler() {
    const [activeTab, setActiveTab] = useState('Availability');
    const [days, setDays] = useState({
        Sun: { checked: false, times: [] },
        Mon: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
        Tue: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
        Wed: { checked: true, times: [{ start: '09:00', end: '16:00' }] },
        Thu: { checked: true, times: [{ start: '09:00', end: '16:00' }] },
        Fri: { checked: true, times: [{ start: '09:00', end: '16:00' }] },
        Sat: { checked: true, times: [{ start: '09:00', end: '17:00' }] },
      });

    const [activity, setActivity] = useState('Event type');
    const [timeZone, setTimeZone] = useState('India Standard Time');
    const [loading, setLoading] = useState(true);

    const events = [
        { day: 'Thu', start: '11:00', end: '11:00', title: 'Meeting 2' },
        { day: 'Fri', start: '09:00', end: '10:00', title: 'Meeting' },
        { day: 'Fri', start: '14:00', end: '15:00', title: 'Meeting 2' },
      ];

      useEffect(() => {
        const fetchAvailability = async () => {
          try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `${token}` } };
            const response = await axios.get('http://localhost:5000/api/availability', config);
            console.log(response.data)
            if (response.data.success) {
              setDays(response.data.availability.days);
              setTimeZone(response.data.availability.timeZone);
            }
          } catch (error) {
            console.error('Failed to fetch availability:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchAvailability();
      }, []);

      const saveAvailability = async () => {
        try {
          const token = localStorage.getItem('token');
          const config = { headers: { Authorization: `${token}` } };
          const payload = { days, timeZone };
          await axios.put('http://localhost:5000/api/availability', payload, config);
        } catch (error) {
          console.error('Failed to save availability:', error);
        }
      };

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
        const updatedTimes = [...days[day].times];
        updatedTimes[index] = { ...updatedTimes[index], [field]: value };
        setDays((prev) => {
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
    <div className={styles.container}>
        <div className={styles.main}>
        <h1 className={styles.header}>Availability</h1>
        <p className={styles.subHeader}>Configure times when you are available for bookings</p>
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
          {activeTab === 'Availability' ? (
            <AvailabilityForm
              days={days}
              handleDayToggle={handleDayToggle}
              handleTimeChange={handleTimeChange}
              addTimeSlot={addTimeSlot}
              removeTimeSlot={removeTimeSlot}
            />
          ) : (
            <CalendarView days={days} events={events} />
          )}
        </div>
        </div>
    </div>
  )
}

export default AvailabilityScheduler