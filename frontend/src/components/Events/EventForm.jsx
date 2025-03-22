import React, {useState} from 'react'

function EventForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [duration, setDuration] = useState('');
  const [link, setLink] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('upcoming');
  const [createdBy, setCreatedBy] = useState('');
  const [participants, setParticipants] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const eventData = {
      title,
      description,
      dateTime,
      duration,
      link,
      bannerImage,
      backgroundColor,
      password,
      status,
      createdBy,
      participants,
    };
    // Call API to create event
    console.log(eventData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <br />
        <label>
          Date and Time:
          <input type="datetime-local" value={dateTime} onChange={(event) => setDateTime(event.target.value)} />
        </label>
        <br />
        <label>
          Duration:
          <input type="number" value={duration} onChange={(event) => setDuration(event.target.value)} />
        </label>
        <br />
        <label>
          Link:
          <input type="text" value={link} onChange={(event) => setLink(event.target.value)} />
        </label>
        <br />
        <label>
          Banner Image:
          <input type="text" value={bannerImage} onChange={(event) => setBannerImage(event.target.value)} />
        </label>
        <br />
        <label>
          Background Color:
          <input type="text" value={backgroundColor} onChange={(event) => setBackgroundColor(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="upcoming">Upcoming</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
            <option value="active">Active</option>
            <option value="deactivated">Deactivated</option>
          </select>
        </label>
        <br />
        <label>
          Created By:
          <input type="text" value={createdBy} onChange={(event) => setCreatedBy(event.target.value)} />
        </label>
        <br />
        <label>
          Participants:
          <input type="text" value={participants} onChange={(event) => setParticipants(event.target.value.split(','))} />
        </label>
        <br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default EventForm;