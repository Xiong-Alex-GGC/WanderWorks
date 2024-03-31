import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => { // Accept userId as a prop
    const [userData, setUserData] = useState(null);

    // Function to fetch user data from the backend based on userId
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/user/${userId}`); // Include the userId in the endpoint URL
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Fetch user data on component mount
    useEffect(() => {
        fetchUserData();
    }, [userId]); // Fetch data whenever userId changes

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <div>
                <img src={userData.profilePicture} alt="Profile Picture" style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '20px' }} />
            </div>
            <div>
                <p><strong>Gender:</strong> {userData.gender}</p>
                <p><strong>Date of Birth:</strong> {userData.dateOfBirth}</p>
                <p><strong>Bio:</strong> {userData.bio}</p>
                <p><strong>Favorite Travel Spot:</strong> {userData.favoriteTravelSpot}</p>
                <p><strong>Country:</strong> {userData.country}</p>
            </div>
        </div>
    );
};

export default UserProfile;