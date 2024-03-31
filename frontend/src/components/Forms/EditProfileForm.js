import React, { useState } from 'react';
import axios from 'axios';

const EditProfileForm = ({ userId, onSubmit }) => { // Define userId as a prop
  const [formData, setFormData] = useState({
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
  
      // Send a POST request to create a new user profile
      const response = await axios.post(`http://localhost:4000/api/user/${userId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Profile created successfully:', response.data);
      if (onSubmit) {
        onSubmit(response.data); // Optional: Pass data to parent component
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <div>
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default EditProfileForm;