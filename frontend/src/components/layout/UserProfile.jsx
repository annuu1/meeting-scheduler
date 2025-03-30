import React, { useState } from "react";
import styles from "../../styles/UserProfile.module.css";
import avatar from "../../assets/icons/avatar.png";
import logoutIcon from "../../assets/icons/logoutIcon.svg";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [logout, setLogout] = useState(false);
  const userName = JSON.parse(localStorage.getItem("user")).name;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };
  const handleMouseClick = () => {
    setLogout(!logout);
  };

  return (
    <div className={styles.container}>
      {logout && (
        <div className={styles.logout} onClick={handleLogout}>
          <img
            src={logoutIcon}
            alt="User Avatar"
            className={styles.logoutIcon}
          />
          <p>Sign out</p>
        </div>
      )}
      <div className={styles.userProfile} onClick={handleMouseClick}>
        <img src={avatar} alt="User Avatar" className={styles.userAvatar} />
        <span className={styles.userName}>{userName}</span>
      </div>
    </div>
  );
};

export default UserProfile;
