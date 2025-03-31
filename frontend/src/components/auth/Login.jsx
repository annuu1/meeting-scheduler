import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';
import authImg from '../../assets/auth_bg.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../layout/Header';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('')
    axios
      .post(`${import.meta.env.VITE_API_URL}api/auth/login`, formData)
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/preferences');
        }
      })
      .catch((err) => {
        console.log(err.response?.data?.error);
        setError(err.response?.data?.error || "An error occurred");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerComponent}>
        <Header />
      </div>
      <div className={styles.formContainer}>
        <div className={styles.formHeaderSignin}>
          <h1>Sign in to your Spark</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles.label}>
            Username
          </label>
          <input
            type="email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={togglePasswordVisibility}
              disabled={isLoading}
            >
              {showPassword ? "👁️‍🗨️" : "👁️"}
            </button>
          </div>
          <button type="submit" className={`${styles.btn} ${styles.loginBtn}`}>
          {isLoading ? "Signing in..." : "Sign in"}
          </button>
          <div className={styles.formFooter}>
            <a href="#">Forgot your password?</a>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <p className={styles.recaptcha}>
          This site is protected by reCAPTCHA and the{' '}
          <a href="#">Google Privacy Policy</a> and{' '}
          <a href="#">Terms of Service</a> apply.
        </p>
      </div>
      <div className={styles.imageContainer}>
        <img src={authImg} alt="auth image bg" />
      </div>
    </div>
  );
}

export default Login;