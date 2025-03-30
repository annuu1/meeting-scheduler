import React, {useState} from 'react'
import axios from 'axios' 
import {Link, useNavigate} from 'react-router-dom'

import styles from '../../styles/Auth.module.css'
import authImg from '../../assets/auth_bg.png'

import Headers from '../layout/Header'

function Signup() {

  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData((prev)=>({...prev, [name]:value}) )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData); 
      if (response.data.success) {
        navigate('/login');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerComponent}>
      <Headers/>
      </div>
      <div className={styles.formContainer}>
          <div className={styles.formHeader}>
              <p>Create an account</p>
              <Link to="/login" className={styles.gotoLogin}> Sign in instead</Link>
          </div>
          <form className={styles.form} onSubmit={handleSubmit} >
            <label htmlFor ='firstName' className={styles.label}>First Name</label>
            <input type="text" name='firstName' className={styles.input} value={formData.firstName} onChange={handleChange} required/>
            <label htmlFor = 'lastName' className={styles.label}>Last Name</label>
            <input type="text" name='lastName' className={styles.input} value={formData.lastName} onChange={handleChange} required/>
            <label htmlFor = 'email' className={styles.label}>Email</label>
            <input type="email" name='email' className={styles.input} value={formData.email} onChange={handleChange} required/>
            <label htmlFor = 'password' className={styles.label}>Password</label>
            <input type="password" name='password' className={styles.input} value={formData.password} onChange={handleChange} required/>
            <label htmlFor = 'confirmPassword' className={styles.label}>Confirm Password</label>
            <input type="password" name='confirmPassword' className={styles.input} 
            value={formData.confirmPassword} onChange={handleChange} required/>
            <div className={styles.terms}>
                <input type="checkbox" id="terms" required/>
                <label htmlFor="terms">By creating an account I agree to our <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a></label>
            </div>
            <button  className={`${styles.btn} ${styles.signup}`} type="submit">Create an account</button>
            {
              error && <p style={{color:'red'}}>{error}</p>
            }
          </form>
          <p className={styles.recaptcha}>This site is protected by reCAPTCHA and the <a href="#">Google Privacy Policy</a> and <a href="#">Terms of Service</a> apply.</p>
      </div>
      <div className={styles.imageContainer}>
        <img src={authImg} alt="auth image bg" />
      </div>
    </div>
  )
}

export default Signup