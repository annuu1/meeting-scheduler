import React, { useState } from 'react';
import styles from '../../styles/Test.module.css'; // Assuming you have a CSS module for styling

const Test = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('upcoming');

  // State to manage event statuses (for accept/reject functionality in Pending tab)
  const [events, setEvents] = useState([
    {
      id: 1,
      date: 'Friday, 28 Feb',
      time: '2:35 PM - 3:00 PM',
      title: 'Appointment',
      participants: ['You', 'Dr. Kumar'],
      status: 'cancelled',
    },
    {
      id: 2,
      date: 'Friday, 28 Feb',
      time: '1:30 PM - 2:30 PM',
      title: 'Meeting-2',
      participants: ['You', 'Team 2'],
      participantCount: 13,
      status: 'upcoming',
    },
    {
      id: 3,
      date: 'Friday, 28 Feb',
      time: '10:30 AM - 12:30 PM',
      title: 'Meeting',
      participants: ['You', 'Team 1'],
      participantCount: 4,
      status: 'pending',
      participantList: [
        { name: 'Akbar Husain', accepted: true },
        { name: 'Aneesh Menon', accepted: false },
        { name: 'Rahul Saini', accepted: false },
        { name: 'Bharat Thakur', accepted: false },
        { name: 'Natalia', accepted: false },
        { name: 'Alia Toy', accepted: false },
      ],
    },
  ]);

  // State to manage the visibility of the participant dropdown
  const [showParticipants, setShowParticipants] = useState(null);

  // Function to handle tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowParticipants(null); // Close participant dropdown when switching tabs
  };

  // Function to handle accept/reject for pending events
  const handleEventAction = (eventId, action) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            status: action === 'accept' ? 'upcoming' : 'cancelled',
          };
        }
        return event;
      })
    );
    setShowParticipants(null); // Close participant dropdown after action
  };

  // Filter events based on the active tab
  const filteredEvents = events.filter((event) => event.status === activeTab);

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logo}>CNNCT</div>
        <div className={styles.menu}>
          <div className={styles.menuItem}>Events</div>
          <div className={styles.menuItemActive}>Booking</div>
          <div className={styles.menuItem}>Availability</div>
          <div className={styles.menuItem}>Settings</div>
        </div>
        <div className={styles.user}>
          <img src="https://via.placeholder.com/40" alt="User Avatar" className={styles.avatar} />
          <span>Sarthak Pal</span>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <h1>Booking</h1>
        <p className={styles.subtitle}>
          See upcoming and past events booked through your event type links.
        </p>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'upcoming' ? styles.active : ''}`}
            onClick={() => handleTabChange('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'pending' ? styles.active : ''}`}
            onClick={() => handleTabChange('pending')}
          >
            Pending
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'cancelled' ? styles.active : ''}`}
            onClick={() => handleTabChange('cancelled')}
          >
            Cancelled
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'past' ? styles.active : ''}`}
            onClick={() => handleTabChange('past')}
          >
            Past
          </button>
        </div>

        {/* Event List */}
        <div className={styles.eventList}>
          {filteredEvents.length === 0 ? (
            <p>No events found for this status.</p>
          ) : (
            filteredEvents.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventDetails}>
                  <div className={styles.eventDateTime}>
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                  </div>
                  <div className={styles.eventInfo}>
                    <p className={styles.eventTitle}>{event.title}</p>
                    <p>{event.participants.join(' and ')}</p>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className={styles.eventActions}>
                  {event.status === 'pending' ? (
                    <>
                      <button
                        className={styles.participantButton}
                        onClick={() =>
                          setShowParticipants(showParticipants === event.id ? null : event.id)
                        }
                      >
                        Participant ({event.participantList.length})
                      </button>
                      {showParticipants === event.id && (
                        <div className={styles.participantDropdown}>
                          <div className={styles.participantHeader}>
                            <span>Participant ({event.participantList.length})</span>
                          </div>
                          <div className={styles.participantList}>
                            {event.participantList.map((participant, index) => (
                              <div key={index} className={styles.participantItem}>
                                <img
                                  src="https://via.placeholder.com/30"
                                  alt="Participant Avatar"
                                  className={styles.participantAvatar}
                                />
                                <span>{participant.name}</span>
                                <input
                                  type="checkbox"
                                  checked={participant.accepted}
                                  readOnly
                                  className={styles.participantCheckbox}
                                />
                              </div>
                            ))}
                          </div>
                          <div className={styles.actionButtons}>
                            <button
                              className={styles.rejectButton}
                              onClick={() => handleEventAction(event.id, 'reject')}
                            >
                              Reject
                            </button>
                            <button
                              className={styles.acceptButton}
                              onClick={() => handleEventAction(event.id, 'accept')}
                            >
                              Accept
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      className={`${styles.statusButton} ${
                        event.status === 'upcoming'
                          ? styles.accepted
                          : event.status === 'cancelled'
                          ? styles.rejected
                          : ''
                      }`}
                    >
                      {event.status === 'upcoming' ? 'Accepted' : 'Rejected'}
                    </button>
                  )}
                  {event.participantCount && (
                    <div className={styles.participantCount}>
                      <span role="img" aria-label="people">
                        👥
                      </span>{' '}
                      {event.participantCount} people
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;