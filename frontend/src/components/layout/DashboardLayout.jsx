import React from "react";
import styles from "./DashboardLayout.module.css";
import { NavLink } from "react-router-dom";

const DashboardLayout = ({ title, subtitle, headerAction, children }) => {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.headerTitle}>{title}</h1>
          <p className={styles.headerSubtitle}>{subtitle}</p>
        </div>
        {headerAction && (
          <div className={styles.headerAction}>
            {(
              <NavLink
              to="/dashboard/create"
              className={({ isActive }) =>
                `${styles.createButton} ${isActive ? styles.active : ""}`
              }
            >
              <span className={styles.plus}>+</span> Add New Event
            </NavLink>

              )}
          </div>
        )}
      </div>

      {/* Main Content Section */}
      <div className={styles.mainContent}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
