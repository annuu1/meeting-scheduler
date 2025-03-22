import React, { useState } from 'react'
import styles from '../../styles/AvailabilityScheduler.module.css'

import Tabs from './Tabs';
import Dropdowns from './Dropdowns';
import AvailabilityForm from './AvailabilityForm';

function AvailabilityScheduler() {
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

    const handleDayToggle = (day)=>{
        setDays((prev)=>({
            ...prev,
            [day]:{...prev[day], checked: !prev[day].checked}
        }))
    }
    const handleTimeChange = (day, index, field, value) =>{
        const updatedTimes = [...days[day].times]
        updatedTimes[index] = {...updatedTimes[index], [field]: value};
        setDays((prev)=>({
            ...prev,
            [day]:{...prev[day], times: updatedTimes},
        }))
    }

    const addTimeSlot = (day) =>{
        setDays((prev)=>({
            ...prev, 
            [day]:{...prev[day], times:[...prev[day].times, {start: "", end:""}]}
        }))
    }
    const removeTimeSlot = (day, index) =>{
        setDays((prev)=>({
            ...prev, 
            [day]:{...prev[day], times:[...prev[day].times.filter((_, i) => i !== index)] }
        }))
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
            setTimeZone={setTimeZone}
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