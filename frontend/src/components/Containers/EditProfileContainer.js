import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProfile from './EditProfile';

const EditProfileContainer = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/user/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post('/api/profile/update', formData);
      console.log('Profile updated successfully:', response.data);
      // Optionally, perform any additional actions upon successful update
    } catch (error) {
      console.error('Error updating profile:', error);
      // Optionally, handle errors and provide user feedback
    }
  };

  return <EditProfile userData={userData} onSubmit={handleSubmit} />;
};

export default EditProfileContainer;