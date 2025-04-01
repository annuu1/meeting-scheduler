import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from '../../styles/Preferences.module.css';
import authImg from '../../assets/auth_bg.png';
import Header from '../layout/Header';
import { useNavigate } from 'react-router-dom';

function Preferences() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    preferences: "",
  });
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const categories = [
    { name: 'Sales', icon: '🏢' },
    { name: 'Education', icon: '📚' },
    { name: 'Finance', icon: '💰' },
    { name: 'Government & Politics', icon: '⚖️' },
    { name: 'Consulting', icon: '🤝' },
    { name: 'Recruiting', icon: '👥' },
    { name: 'Tech', icon: '💻' },
    { name: 'Marketing', icon: '📈' },
  ];

  // Fetch user data on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}api/auth/me`, {
          headers: { Authorization: `${token}` },
        });
        const user = response.data.user;
        setUserData(user);

        // If username and preferences
        if (user.username && user.preferences) {
          navigate('/dashboard/events');
        } else {
          setFormData({
            username: user.username || "",
            preferences: user.preferences || "",
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login'); // Redirect to login if token is invalid
      }
    };

    fetchUserData();
  }, [navigate]);

  // Debounced
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const checkUsernameAvailability = async (username) => {
    if (!username || username === userData?.username) {
      setUsernameAvailable(null);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}api/auth/check-username${username}`);
      setUsernameAvailable(response.data.available);
    } catch (error) {
      console.error('Error checking username:', error);
      setUsernameAvailable(null);
    } finally {
      setLoading(false);
    }
  };

  const debouncedCheckUsername = useCallback(debounce(checkUsernameAvailability, 500), [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'username') {
      debouncedCheckUsername(value);
    }
  };

  const handleCategorySelect = (category) => {
    setFormData((prev) => ({ ...prev, preferences: category }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.preferences) {
      alert('Please provide a username and select a category.');
      return;
    }
    if (formData.username !== userData?.username && !usernameAvailable) {
      alert('Username is not available. Please choose another.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in first.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}api/auth/preferences`,
        { username: formData.username, preferences: formData.preferences },
        { headers: { Authorization: `${token}` } }
      );
      if (response.data.success) {
        alert('Preferences saved successfully!');
        navigate('/dashboard/events');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert(error.response?.data?.error || 'An error occurred while saving preferences.');
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerComponent}>
        <Header />
      </div>
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <h1 className={styles.formHeaderSignin}>Your Preferences</h1>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Tell us your username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={styles.input}
                required
              />
              {formData.username && formData.username !== userData?.username && (
                <span className={styles.usernameStatus}>
                  {loading
                    ? 'Checking...'
                    : usernameAvailable === true
                    ? 'Username available'
                    : usernameAvailable === false
                    ? 'Username taken'
                    : ''}
                </span>
              )}
            </div>
            <p>Select one category that best describes your CNNCT:</p>
            <div className={styles.grid}>
              {categories.map((category, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.categoryButton} ${
                    formData.preferences === category.name ? styles.selected : ''
                  }`}
                  onClick={() => handleCategorySelect(category.name)}
                >
                  <i className={styles.categoryIcon}>{category.icon}</i>
                  <div className={styles.categoryName}>{category.name}</div>
                </button>
              ))}
            </div>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              Continue
            </button>
          </form>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img src={authImg} alt="auth image bg" />
      </div>
    </div>
  );
}

export default Preferences;