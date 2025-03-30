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

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard/events");    
  },[])
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
          <Route
            path="event/:id/edit"
            element={
              <DashboardLayout
                title="Edit Event"
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
