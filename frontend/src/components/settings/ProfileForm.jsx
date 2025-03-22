import React, {useState, useEffect} from 'react'
import styles from '../../styles/ProfileForm.module.css'
import axios from 'axios';

function ProfileForm() {
      const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
      })

      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/auth/profile', {
              headers: {
                Authorization: `${token}`,
              },
            });
            const { firstName, lastName, email } = response.data;
            setFormData({ firstName, lastName, email, password: "", confirmPassword: "" });
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUserData();
      }, []);
    
      const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData((prev)=>({...prev, [name]:value}) )
      }
      const handleSubmit = (e)=>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        const config = {
          headers:{
            'Authorization': `${token}`
          }
        }

        axios.put('http://localhost:5000/api/auth/profile', formData, config)
        .then((response)=>{
            if(response.data.success){
              localStorage.setItem('token', response.data.token);
              navigate('/dashboard')
            }else{
            }
        })
        .catch((err)=>{
          console.log(err.response.data.error)
        })
      }
    

  return (
      <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.formHeader}>
                    <h1>form header</h1>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
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
                  <button type="submit">Save</button>
                </form>
            </div>
          </div>
    )
}

export default ProfileForm