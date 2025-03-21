import React from 'react'
import Navbar from './Sidebar'
import styles from '../../styles/Dashboard.module.css'

function Dashboard() {
  return (
    <div className={styles.container}>
        <Navbar />
        <main className={styles.main}>
            <h1>Dashboard</h1>
        </main>
        
    </div>
  )
}

export default Dashboard