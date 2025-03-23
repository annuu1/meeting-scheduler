import React from 'react';

const EventTypesPage = () => {
  return (
    <div style={styles.body}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <img
            src="https://via.placeholder.com/32"
            alt="Logo"
            style={styles.logo}
          />
          <span style={styles.logoText}>CNNCT</span>
        </div>
        <nav style={styles.nav}>
          <a href="#" style={{ ...styles.navItem, ...styles.navItemActive }}>
            <span style={styles.navItemIcon}>📅</span> Events
          </a>
          <a href="#" style={styles.navItem}>
            <span style={styles.navItemIcon}>📆</span> Booking
          </a>
          <a href="#" style={styles.navItem}>
            <span style={styles.navItemIcon}>⏰</span> Availability
          </a>
          <a href="#" style={styles.navItem}>
            <span style={styles.navItemIcon}>⚙️</span> Settings
          </a>
        </nav>
        <div style={styles.userProfile}>
          <img
            src="https://via.placeholder.com/32"
            alt="User Avatar"
            style={styles.userAvatar}
          />
          <span style={styles.userName}>sarthak pal</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.headerTitle}>Event Types</h1>
            <p style={styles.headerSubtitle}>
              Create events to share for people to book on your calendar.
            </p>
          </div>
          <button style={styles.addButton}>+ Add New Event</button>
        </div>
        <div style={styles.eventList}>
          <div style={styles.eventCard}>
            <div style={styles.eventCardHeader}>
              <h3 style={styles.eventCardTitle}>Meeting</h3>
              <span style={styles.editIcon}>✏️</span>
            </div>
            <p style={styles.eventCardDetails}>
              Friday, 28 Feb<br />
              10:00 AM - 12:00 AM<br />
              1hr, Group meeting
            </p>
            <div style={styles.eventCardFooter}>
              <div style={{ ...styles.toggleSwitch, ...styles.toggleSwitchActive }}></div>
              <div style={styles.icons}>
                <span style={styles.icon}>📋</span>
                <span style={styles.icon}>🗑️</span>
              </div>
            </div>
          </div>
          <div style={styles.eventCard}>
            <div style={styles.eventCardHeader}>
              <h3 style={styles.eventCardTitle}>Meeting-2</h3>
              <span style={styles.editIcon}>✏️</span>
            </div>
            <p style={styles.eventCardDetails}>
              Friday, 28 Feb<br />
              2:00 PM - 3:00 PM<br />
              1hr, Group meeting
            </p>
            <div style={styles.eventCardFooter}>
              <div style={{ ...styles.toggleSwitch, ...styles.toggleSwitchActive }}></div>
              <div style={styles.icons}>
                <span style={styles.icon}>📋</span>
                <span style={styles.icon}>🗑️</span>
              </div>
            </div>
          </div>
          <div style={styles.eventCard}>
            <div style={styles.eventCardHeader}>
              <h3 style={styles.eventCardTitle}>Appointment</h3>
              <span style={styles.editIcon}>✏️</span>
            </div>
            <p style={styles.eventCardDetails}>
              Friday, 28 Feb<br />
              2:35 PM - 3:00 PM<br />
              1hr, Group meeting
            </p>
            <div style={styles.eventCardFooter}>
              <div style={styles.toggleSwitch}></div>
              <div style={styles.icons}>
                <span style={styles.icon}>📋</span>
                <span style={styles.icon}>🗑️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles (converted to JavaScript objects for React inline styling)
const styles = {
  body: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: "'Roboto', sans-serif",
  },
  // Sidebar Styles
  sidebar: {
    width: '260px',
    backgroundColor: '#ffffff',
    padding: '24px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px',
  },
  logo: {
    width: '32px',
    height: '32px',
    marginRight: '8px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  nav: {
    flexGrow: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',
    color: '#5f6368',
    textDecoration: 'none',
    fontSize: '16px',
  },
  navItemActive: {
    color: '#1a73e8',
  },
  navItemIcon: {
    marginRight: '8px',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 'auto',
  },
  userAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    marginRight: '8px',
  },
  userName: {
    fontSize: '14px',
    color: '#5f6368',
  },
  // Main Content Styles
  main: {
    flexGrow: 1,
    padding: '32px',
    backgroundColor: '#f5f5f5',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  headerTitle: {
    fontSize: '24px',
    color: '#202124',
  },
  headerSubtitle: {
    fontSize: '14px',
    color: '#5f6368',
    marginTop: '4px',
  },
  addButton: {
    backgroundColor: '#1a73e8',
    color: '#ffffff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  eventList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
  },
  eventCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #dadce0',
    borderRadius: '8px',
    width: '300px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  eventCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  eventCardTitle: {
    fontSize: '16px',
    color: '#202124',
  },
  editIcon: {
    fontSize: '16px',
    color: '#5f6368',
    cursor: 'pointer',
  },
  eventCardDetails: {
    fontSize: '14px',
    color: '#5f6368',
    marginBottom: '16px',
  },
  eventCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleSwitch: {
    width: '40px',
    height: '20px',
    backgroundColor: '#dadce0',
    borderRadius: '10px',
    position: 'relative',
    cursor: 'pointer',
  },
  toggleSwitchActive: {
    backgroundColor: '#1a73e8',
  },
  icons: {
    display: 'flex',
    gap: '8px',
  },
  icon: {
    fontSize: '16px',
    color: '#5f6368',
    cursor: 'pointer',
  },
};

export default EventTypesPage;