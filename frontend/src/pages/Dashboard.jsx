import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import EventList from "../components/Events/EventList";
import Booking from "../components/booking/Booking";
import Availability from "../components/availabilityScheduler/AvailabilityScheduler";
import Settings from "../components/settings/ProfileForm";
import styles from "../styles/Dashboard.module.css";
import Sidebar from "../components/layout/Sidebar";
import EventForm from "../components/Events/EventForm";

import Header from "../components/layout/Header";
import UserProfile from "../components/layout/UserProfile";

import events from "../assets/icons/events.svg";
import availability from "../assets/icons/availability.svg";
import booking from "../assets/icons/booking.svg";
import settings from "../assets/icons/settings.svg";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />

      {/* Main Content Area */}
      <div className={styles.content}>
        <Routes>
          <Route
            path="events"
            element={
              <DashboardLayout
                title="Event Types"
                subtitle="Create events to share for people to book on your calendar."
              >
                <EventList />
              </DashboardLayout>
            }
          />
          <Route
            path="booking"
            element={
              <DashboardLayout
                title="Booking"
                subtitle="See upcoming and past events booked through your event type links."
              >
                <Booking />
              </DashboardLayout>
            }
          />
          <Route
            path="availability"
            element={
              <DashboardLayout
                title="Availability"
                subtitle="Set your available times for scheduling."
              >
                <Availability />
              </DashboardLayout>
            }
          />
          <Route
            path="settings"
            element={
              <DashboardLayout
                title="Profile"
                subtitle="Manage settings for your profile"
              >
                <Settings />
              </DashboardLayout>
            }
          />
          <Route
            path="create"
            element={
              <DashboardLayout
                title="Create Event"
                subtitle="New events to share for people to book on your calendar."
              >
                <EventForm />
              </DashboardLayout>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
