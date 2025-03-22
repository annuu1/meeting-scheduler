import React, { useState } from 'react';
import axios from 'axios';

function EventForm() {
  const [formData, setFormData] = useState({
    title: 'event1',
    description: 'anurag rajpt',
    dateTime: '',
    duration: '60',
    link: 'https://google.com',
    bannerImage: '',
    backgroundColor: 'red',
    password: '123456',
    status: 'upcoming',
    createdBy: '',
    participants: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'participants') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(','),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `${token}`,
      },
    };
    axios.post('http://localhost:5000/api/events', formData, config)
      .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Date and Time:
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Duration:
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Link:
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Banner Image:
          <input
            type="text"
            name="bannerImage"
            value={formData.bannerImage}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Background Color:
          <input
            type="text"
            name="backgroundColor"
            value={formData.backgroundColor}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="upcoming">Upcoming</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
            <option value="active">Active</option>
            <option value="deactivated">Deactivated</option>
          </select>
        </label>
        <br />
        <label>
          Participants:
          <input
            type="text"
            name="participants"
            value={formData.participants.join(',')}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default EventForm;