import React, { useState } from 'react';

const UserProfile = () => {
  // State variables for user information
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [country, setCountry] = useState('');
  const [color, setColor] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log('Form submitted');
    // Include profilePicture in the data you send to the backend
    const userData = {
      birthday,
      gender,
      bio,
      country,
      color,
      profilePicture
    };
    console.log(userData);
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="color">Favorite Color:</label>
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserProfile;