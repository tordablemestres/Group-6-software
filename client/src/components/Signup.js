// client/src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Ensure useNavigate is used instead of useHistory

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Send signup request to the backend
            const res = await axios.post('/api/auth/signup', { username, password });
            if (res.status === 201) {
                alert('User created successfully. Please log in.');
                // Redirect to the login page
                navigate('/'); // Use navigate instead of history.push
            }
        } catch (error) {
            alert('Error signing up: ' + error.response.data.message);
        }
    };

    return (
        <div className="signup-container">
            <h1>LessStress</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Username</label>
                    <br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign up</button>
            </form>
            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
}

export default Signup;
