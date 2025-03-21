import React, {useState} from 'react'
import styles from '../../styles/EventCard.module.css'

function EventCard({title, date, time, duration}) {
    
  return (

    <div className={styles.card}> 
        <h2>{title}</h2>
        <h4>{date}</h4>
        <h4>{time}</h4>
        <h4>{duration}</h4>
    </div>
  )
}

export default EventCard