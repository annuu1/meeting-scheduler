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
              {showPassword ? <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.6247 10.5763L10.0873 9.03885C9.59681 9.38824 8.99677 9.59375 8.34873 9.59375C6.69187 9.59375 5.34873 8.25058 5.34873 6.59373C5.34873 5.94569 5.5542 5.34563 5.90355 4.85517L4.2523 3.20392C3.23951 4.04352 2.29897 5.19028 1.43355 6.59373C3.37232 9.73775 5.68814 11.5932 8.34873 11.5932C9.49845 11.5932 10.5938 11.2383 11.6247 10.5763ZM12.4405 9.97795L10.7943 8.33171C11.1434 7.84135 11.3487 7.24152 11.3487 6.59373C11.3487 4.93687 10.0056 3.59373 8.34873 3.59373C7.70094 3.59373 7.1011 3.79904 6.61074 4.14815L5.06779 2.60519C6.09411 1.94657 7.18865 1.59373 8.34873 1.59373C11.0092 1.59373 13.3251 3.44956 15.2638 6.59367C14.3997 7.99387 13.455 9.13875 12.4405 9.97795ZM13.1502 10.6875C14.3176 9.70234 15.3621 8.38398 16.278 6.85006V6.33739C14.2476 2.93697 11.6166 0.593725 8.34873 0.593725C6.88821 0.593725 5.55493 1.06177 4.34563 1.88304L2.70228 0.239685L1.99517 0.946785L3.54271 2.49433C2.37679 3.48046 1.33682 4.80101 0.419434 6.33739V6.85006C2.44989 10.2505 5.08083 12.5932 8.34873 12.5932C9.79791 12.5932 11.1324 12.1232 12.3468 11.2984L13.9952 12.9467L14.7023 12.2396L13.1502 10.6875ZM10.3487 6.59373C10.3487 6.9645 10.2478 7.31172 10.072 7.6094L7.33305 4.87046C7.63074 4.69462 7.97795 4.59373 8.34873 4.59373C9.4533 4.59373 10.3487 5.48916 10.3487 6.59373ZM9.36502 8.31664L6.62582 5.57744C6.44976 5.87526 6.34873 6.22269 6.34873 6.59373C6.34873 7.6983 7.24416 8.59373 8.34873 8.59373C8.71976 8.59373 9.06719 8.49269 9.36502 8.31664Z" fill="black"/>
</svg>
 : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
 <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
 <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>}
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