import React, { useState } from 'react';
import './AuthForm.css';
import { Link } from 'react-router-dom';
import { auth, googleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, AuthErrorCodes } from '../firebase-config';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ error: false, msg: '' });

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage({ error: false, msg: '' });

        if (email === '' || password === '') {
            setMessage({ error: true, msg: 'All fields are mandatory!' });
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userEmailStart = email.split('@')[0];
            window.location.href = `/${userEmailStart}`;
            console.log('User signed up successfully:', userCredential.user);
            alert('User signed up successfully!');
        } catch (error) {
            console.error('Signup error:', error);

            if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
                setMessage({ error: true, msg: 'This email address is already in use.' });
            } else {
                setMessage({ error: true, msg: 'Signup error. Please try again.' });
            }
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider);
        } catch (error) {
            console.error('Google sign-in error:', error);
            alert('Google sign-in error. Please try again.');
        }
    };

    return (
        <div className="auth-form-container">
            <h2 className="auth-form-title">Sign Up</h2>

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
            <button className="auth-form-button" onClick={handleSignup}>
                Sign Up
            </button>
            {message.error && <p className="auth-form-error">{message.msg}</p>}
            <p className="auth-form-text">
                Already have an account? <Link to="/login">Login</Link>
            </p>
            <button onClick={handleGoogleSignIn} className="auth-google-button">
                Continue with Google
            </button>
        </div>
    );
};

export default Signup;
