import React from 'react'
import logo from '../../assets/logo.png'

import styles from '../../styles/Header.module.css'

function Header() {
  return (
    <div className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2 className={styles.logoText}>CNNCT</h2>
    </div>
  )
}

export default Header