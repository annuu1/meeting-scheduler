import React, { useState, useEffect } from "react";
import styles from "../../styles/ProfileForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { showToast } from "../ui/ToastContainer";

function ProfileForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        const { firstName, lastName, email } = response.data.user;
        setFormData({
          firstName: firstName || "",
          lastName: lastName || "",
          email: email || "", 
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    axios
      .put("http://localhost:5000/api/auth/profile", formData, config)
      .then((response) => {
        if (response.data.shouldLogout) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          navigate("/dashboard");
        }

        showToast()(response.data.message, "success")
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Profile</h1>
          <p className={styles.headerSubtitle}>
            Manage settings for your profile
          </p>
        </div>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <p className={`${styles.formTitle} ${styles.active}`}>Edit Profile</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button className={styles.submitBtn} type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
