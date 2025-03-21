import React, { useState } from 'react';
import styles from '../../styles/Auth.module.css';
import authImg from '../../assets/auth_bg.png';

function Login() {
const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData((prev)=>({...prev, [name]:value}) )
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
          <div className={styles.formHeaderSignin}>
              <h1>Login in</h1>
          </div>
          <form className={styles.form}>
            <label htmlFor ='firstName'>First Name</label>
            <label htmlFor = 'email'>Email</label>
            <input type="email" name='email' value={formData.email} onChange={handleChange} required/>
            <label htmlFor = 'password'>Password</label>
            <input type="password" name='password' value={formData.password} onChange={handleChange} required/>
            <button type="submit">Login</button>
          </form>
      </div>
      <div className={styles.imageContainer}>
        <img src={authImg} alt="auth image bg" />
      </div>
    </div>
  )}

export default Login;