import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import './AuthForm.css';
import { auth, signInWithEmailAndPassword, signInWithPopup, googleAuthProvider } from '../firebase-config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const provider = new googleAuthProvider();
            await signInWithPopup(auth, provider);
            console.log('User logged in with Google');
            // After successful Google login, navigate to the desired route (e.g., home page)
            navigate('/');
        } catch (error) {
            console.error(error);
            setErrorMessage('Error with Google', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully');
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Login failed. Please check your email and password.');
            console.error(error);
            setErrorMessage('Error:', error);
        }
    };


    return (
        <div className="auth-form-container">
            <h2 className="auth-form-title">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="auth-form-group">
                    <label htmlFor="email" className="auth-form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="auth-form-input"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="auth-form-group">
                    <label htmlFor="password" className="auth-form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="auth-form-input"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="auth-form-button">
                    Login
                </button>
                {errorMessage && <p className="auth-form-error">{errorMessage}</p>}
                <p className="auth-form-text">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
                {/* <button onClick={handleGoogleSignIn} className="auth-google-button">
                    Continue with Google
                </button> */}
            </form>
        </div>
    );
};

export default Login;
