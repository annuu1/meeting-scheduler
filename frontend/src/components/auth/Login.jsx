import React, { useState } from 'react';
import styles from '../../styles/Auth.module.css';
import authImg from '../../assets/auth_bg.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../layout/Header';

function Login() {
const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData((prev)=>({...prev, [name]:value}))
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', formData)
    .then((response)=>{
        if(response.data.success){
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('name', response.data.name);
          navigate('/dashboard')
        }else{
        }
    })
    .catch((err)=>{
      console.log(err.response.data.error)
      err.response ? setError(err.response.data.error):"An error occured"
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
          <div className={styles.formHeaderSignin}>
              <h1>Sign in to your Spark</h1>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor ='firstName' >First Name</label>
            <input type="email" name='email' className={styles.input} value={formData.email} onChange={handleChange} required/>
            <label htmlFor = 'password'>Password</label>
            <input type="password" name='password' className={styles.input} value={formData.password} onChange={handleChange} required/>
            <button type="submit" className={styles.btn} >Login</button>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </form>

          {
            error && <p style={{color:'red'}}>{error}</p>
          }
      </div>
      <div className={styles.imageContainer}>
        <img src={authImg} alt="auth image bg" />
      </div>
    </div>
  )}

export default Login;