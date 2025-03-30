import React, { useState } from 'react';
import styles from '../../styles/Preferences.module.css';
import authImg from '../../assets/auth_bg.png';
import Header from '../layout/Header';

import finance from '../../assets/preferencesIcons/finance.svg';

function Preferences() {
const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  const categories = [
    { name: 'Sales', icon: '🏢' },
    { name: 'Education', icon: '📚' },
    { name: 'Finance', icon: '📚' },
    { name: 'Government & Politics', icon: '⚖️' },
    { name: 'Consulting', icon: '📚' },
    { name: 'Recruiting', icon: '📚' },
    { name: 'Tech', icon: '📚' },
    { name: 'Marketing', icon: '📚' },
  ];

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData((prev)=>({...prev, [name]:value}) )
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.formContainer}> 
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
              <h1>Your Preferences</h1>
          </div>
          <form className={styles.form}>
            <input type="text" placeholder='Tell us your username' 
            name='username' value={formData.username} 
            onChange={handleChange} className={styles.input} 
            required/>
            <p>Select one category that best describes your CNNCT:</p>
            <div className={styles.grid}>
            {
                categories.map((category, index)=>{
                    return (
                        <button key={index} className={styles.categoryButton}> 
                        <i className={styles.categoryIcon}>{category.icon}</i> 
                        <div className={styles.categoryName}>{category.name}</div>
                        </button>
                    )
                })
            }

            </div>
            
            <button type="submit" className={styles.submitButton} >Continue</button>
          </form>
          </div>
      </div>
      <div className={styles.imageContainer}>
        <img src={authImg} alt="auth image bg" />
      </div>
    </div>
  )}

export default Preferences;