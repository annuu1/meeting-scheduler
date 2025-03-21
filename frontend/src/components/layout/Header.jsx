import React from 'react'
import logo from '../../assets/logo.png'

import styles from '../../styles/Header.module.css'

function Header() {
  return (
    <div className={styles.header}>
        <img src={logo} alt="Logo" />
        <h2>CNNCT</h2>
    </div>
  )
}

export default Header