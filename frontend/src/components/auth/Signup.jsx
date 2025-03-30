import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/Auth.module.css';
import authImg from '../../assets/auth_bg.png';
import Headers from '../layout/Header';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters, include an uppercase letter, lowercase letter, number, and special character';
    }

 
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; 
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      if (response.data.success) {
        navigate('/login');
      } else {
        setErrors({ server: response.data.message });
      }
    } catch (err) {
      console.log(err.response?.data?.message);
      setErrors({ server: err.response?.data?.message || 'An error occurred' });
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  return (
    <div className={styles.container}>
      <div className={styles.headerComponent}>
        <Headers />
      </div>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <p>Create an account</p>
          <Link to="/login" className={styles.gotoLogin}>
            Sign in instead
          </Link>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            className={styles.input}
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}

          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            className={styles.input}
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {/* {showPassword ? '👁️‍🗨️' : '👁️'} */}
            </button>
          </div>
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <div className={styles.passwordWrapper}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              className={styles.input}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={toggleConfirmPasswordVisibility}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {/* {showConfirmPassword ? '👁️‍🗨️' : '👁️'} */}
            </button>
          </div>
          {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}

          <div className={styles.terms}>
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              By creating an account I agree to our <a href="#">Terms of use</a> and{' '}
              <a href="#">Privacy Policy</a>
            </label>
          </div>
          <button className={`${styles.btn} ${styles.signup}`} type="submit">
            Create an account
          </button>
          {errors.server && <p className={styles.error}>{errors.server}</p>}
        </form>
        <p className={styles.recaptcha}>
          This site is protected by reCAPTCHA and the <a href="#">Google Privacy Policy</a> and{' '}
          <a href="#">Terms of Service</a> apply.
        </p>
      </div>
      <div className={styles.imageContainer}>
        <img src={authImg} alt="auth image bg" />
      </div>
    </div>
  );
}

export default Signup;