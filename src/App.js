import React, { useEffect, useState } from 'react';
import './App.css';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EventDetails from './components/EventDetails';
import EventCreation from './components/EventCreation';
import EventViewer from './components/EventViewer';
import SearchBar from './components/SearchBar';
import { auth } from './firebase-config';
import { Analytics } from '@vercel/analytics/react';

function App() {
    const [user, setUser] = useState(null);
    const [searchResults, setSearchResults] = useState({ events: [], users: [] });
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // User is signed in
                setUser(authUser);
            } else {
                // User is signed out
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSearch = (searchQuery) => {
        // Filter events based on the search query
        const filteredEvents = events.filter((event) =>
            event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
        setSearchResults({ events: filteredEvents, users: [] });
    };

    return (
        <>
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">
                        Events Viewer
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            {user ? (
                                // User is authenticated, show Create Event link and Logout
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/create-event">
                                            Create Event
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className="nav-link btn btn-link"
                                            onClick={() => auth.signOut()}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                // User is not authenticated, show Login and Signup links
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">
                                            Signup
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                        {user && <SearchBar onSearch={handleSearch} />}
                    </div>
                </nav>
                <Routes>
                    <Route
                        path="/"
                        element={user ? <EventViewer searchResults={searchResults} /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/"
                        element={user ? <EventViewer searchResults={searchResults} /> : <Navigate to="/login" />}
                    />
                    <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                    <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
                    <Route path="/event/:eventId" element={<EventDetails />} />
                    <Route
                        path="/create-event"
                        element={user ? <EventCreation /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </Router>
        <Analytics />
        </>
    );
}

export default App;
