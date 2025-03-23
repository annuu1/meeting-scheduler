import React, {useState} from 'react'
import styles from '../../styles/EventCard.module.css'

import toggleOn from '../../assets/icons/toggleOn.svg'
import toggleOff from '../../assets/icons/toggleOff.svg'
import copyBtn from '../../assets/icons/copyBtn.svg'
import deleteBtn from '../../assets/icons/deleteBtn.svg'

function EventCard({title, date, time, duration}) {
    
  return (

    <div className={styles.card}> 
    <div className={styles.line}></div>
    <div className={styles.content}>
        <div>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div>
          <h4 className={styles.date}>{date}</h4>
          <h4 className={styles.time}>{time}</h4>
          <h4 className={styles.duration}>{duration}</h4>
        </div>
    </div>
    <hr className={styles.divider}/>
    <div className={styles.actions}>
    <img src={toggleOn} alt=""  className={styles.action}/>
    <img src={copyBtn} alt="" className={styles.action} />
    <img src={deleteBtn} alt="" className={styles.action}/>
    </div>
    
    </div>
  )
}

export default EventCard