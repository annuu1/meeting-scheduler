import React, {useState} from 'react'
import axios from 'axios' 
import {useNavigate} from 'react-router-dom'

import styles from '../../styles/Auth.module.css'

import authImg from '../../assets/auth_bg.png'

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
      <div className={styles.formContainer}>
          <div className={styles.formHeader}>
              <h1>form header</h1>
          </div>
          <form className={styles.form} onSubmit={handleSubmit} >
            <label htmlFor ='firstName'>First Name</label>
            <input type="text" name='firstName' value={formData.firstName} onChange={handleChange} required/>
            <label htmlFor = 'lastName'>Last Name</label>
            <input type="text" name='lastName' value={formData.lastName} onChange={handleChange} required/>
            <label htmlFor = 'email'>Email</label>
            <input type="email" name='email' value={formData.email} onChange={handleChange} required/>
            <label htmlFor = 'password'>Password</label>
            <input type="password" name='password' value={formData.password} onChange={handleChange} required/>
            <label htmlFor = 'confirmPassword'>Confirm Password</label>
            <input type="password" name='confirmPassword' 
            value={formData.confirmPassword} onChange={handleChange} required/>
            <div className={styles.terms}>
                <input type="checkbox" id="terms" required/>
                <label htmlFor="terms">By creating an account I agree to our <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a></label>
            </div>
            <button type="submit">Create an account</button>
            {
              error && <p style={{color:'red'}}>{error}</p>
            }
          </form>
      </div>
      <div className={styles.imageContainer}>
        <img src={authImg} alt="auth image bg" />
      </div>
    </div>
  )
}

export default Signup