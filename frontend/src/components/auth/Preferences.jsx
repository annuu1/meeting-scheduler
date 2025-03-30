import React, { useState } from 'react';
import styles from '../../styles/Preferences.module.css';
import authImg from '../../assets/auth_bg.png';
import Header from '../layout/Header';

function Preferences() {
const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  const categories = [
    { name: 'Sales', icon: 'fas fa-briefcase' },
    { name: 'Education', icon: 'fas fa-graduation-cap' },
    { name: 'Finance', icon: 'fas fa-dollar-sign' },
    { name: 'Government &amp; Politics', icon: 'fas fa-landmark' },
    { name: 'Consulting', icon: 'fas fa-comments' },
    { name: 'Recruiting', icon: 'fas fa-user-tie' },
    { name: 'Tech', icon: 'fas fa-laptop-code' },
    { name: 'Marketing', icon: 'fas fa-bullhorn' },
  ];

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData((prev)=>({...prev, [name]:value}) )
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.formContainer}>
          <div className={styles.formHeaderSignin}>
              <h1>Your Preferences</h1>
          </div>
          <form className={styles.form}>
            <input type="text" placeholder='Tell us your username' name='username' value={formData.username} onChange={handleChange} className={styles.input} required/>
            <h2>Select one category that best describes your CNNCT:</h2>
            <div className={styles.grid}>
            {
                categories.map((category, index)=>{
                    return (
                        <button key={index}> <i>{category.icon}</i> category</button>
                    )
                })
            }

            </div>
            
            <button type="submit">Continue</button>
          </form>
      </div>
      <div className={styles.imageContainer}>
        <img src={authImg} alt="auth image bg" />
      </div>
    </div>
  )}

export default Preferences;