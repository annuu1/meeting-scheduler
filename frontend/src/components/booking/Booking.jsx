import React, {useState} from 'react'
import styles from '../../styles/Booking.module.css'

function Booking() {
    const [activeTab, setActiveTab] = useState('upcoming')

  return (
    <div className={styles.cotainer}>
        <div className={styles.bookingHead}>
            <h1>Booking</h1>
            <p>See upcoming and past events booked through your event type links.</p>
        </div>
        <div className={styles.booking}>
            <div className={styles.tabs}>
                <button className={styles.tab} onClick={() => setActiveTab('upcoming')}>Upcoming</button>
                <button className={styles.tab} onClick={()=> setActiveTab('pending')} >Pending</button>
                <button className={styles.tab} onClick={()=> setActiveTab('cancelled')} >Cancelled</button>
                <button className={styles.tab} onClick={()=> setActiveTab('past')} >Past</button>
            </div>
            <div className={styles.bookingList}>
                {activeTab==='upcoming' && (<h1>{activeTab}</h1>)}
                {activeTab==='pending' && (<h1>{activeTab}</h1>)}
                {activeTab==='cancelled' && (<h1>{activeTab}</h1>)}
                {activeTab==='past' && (<h1>{activeTab}</h1>)}
            </div>

        </div>
    </div>
  )
}

export default Booking