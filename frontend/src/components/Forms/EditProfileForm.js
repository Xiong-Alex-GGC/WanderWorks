import React, { useState } from 'react';
import axios from 'axios';

const EditProfileForm = ({ userData, onSubmit }) => {
  const [formData, setFormData] = useState(userData || {
    profilePicture: '',
    gender: '',
    dateOfBirth: '',
    bio: '',
    favoriteTravelSpot: '',
    country: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('profilePicture', formData.profilePicture);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('dateOfBirth', formData.dateOfBirth);
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('favoriteTravelSpot', formData.favoriteTravelSpot);
      formDataToSend.append('country', formData.country);

      const response = await axios.post('/api/profile/update', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Profile updated successfully:', response.data);
      if (onSubmit) {
        onSubmit(response.data); // Optional: Pass data to parent component
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Profile Picture:</label>
          <input type="file" name="profilePicture" onChange={handleFileInputChange} />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
        </div>
        <div>
          <label>Bio:</label>
          <textarea name="bio" value={formData.bio} onChange={handleInputChange}></textarea>
        </div>
        <div>
          <label>Favorite Travel Spot:</label>
          <input type="text" name="favoriteTravelSpot" value={formData.favoriteTravelSpot} onChange={handleInputChange} />
        </div>
        <div>
          <label>Country:</label>
          <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfileForm;