import React, { useState } from 'react';
import { useAuth } from "../context/authContext";
import { sendUserPasswordResetEmail } from '../firebase/auth'; // Ensure you have this function implemented properly in your auth module

const ResetPassword = () => {
    const { currentUser } = useAuth();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await sendUserPasswordResetEmail(email);
            setMessage('Check your inbox for further instructions');
        } catch {
            setError('Failed to reset password');
        }

        setLoading(false);
    };

    return (
        <>
            <h2>Reset Password</h2>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </label>
                <button disabled={loading} type="submit">Reset Password</button>
            </form>
        </>
    );
}

export default ResetPassword;