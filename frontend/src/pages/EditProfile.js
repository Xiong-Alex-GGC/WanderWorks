import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import styles  from "../styles/EditProfile-Styles"; 
import EditProfileForm from "../components/Forms/EditProfileForm";

const EditProfile = ({ userData, onSubmit }) => {
    const [formData, setFormData] = useState(userData || {
      profilePicture: '',
      gender: '',
      dateOfBirth: '',
      bio: '',
      favoriteTravelSpot: '',
      country: ''
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle file input change for profile picture
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePicture: file });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create a FormData object to send file data
            const formDataToSend = new FormData();
            formDataToSend.append('profilePicture', formData.profilePicture);
            formDataToSend.append('gender', formData.gender);
            // Append other profile data...
    
            // Send the updated profile data to the backend
            const response = await axios.post('/api/profile/update', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Profile updated successfully:', response.data);
            // Optionally, perform any additional actions upon successful update
        } catch (error) {
            console.error('Error updating profile:', error);
            // Optionally, handle errors and provide user feedback
        }
    };

    return (
        <div style={styles.container}>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="profilePicture">Profile Picture:</label>
                    <input style={styles.input} type="file" id="profilePicture" name="profilePicture" onChange={handleFileInputChange} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="gender">Gender:</label>
                    <select style={styles.select} name="gender" id="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="dateOfBirth">Date of Birth:</label>
                    <input style={styles.input} type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="bio">Bio:</label>
                    <textarea style={styles.textarea} id="bio" name="bio" value={formData.bio} onChange={handleInputChange}></textarea>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="favoriteTravelSpot">Favorite Travel Spot:</label>
                    <input style={styles.input} type="text" id="favoriteTravelSpot" name="favoriteTravelSpot" value={formData.favoriteTravelSpot} onChange={handleInputChange} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="country">Country:</label>
                    <input style={styles.input} type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} />
                </div>
                <button style={styles.button} type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;