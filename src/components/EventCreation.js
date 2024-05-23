import React, { useState } from 'react';
import './EventCreation.css';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EventCreation = () => {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDateTime, setEventDateTime] = useState('');
    const [eventImage, setEventImage] = useState(null);
    const [eventVenue, setEventVenue] = useState('');
    const [registrationLink, setRegistrationLink] = useState('');
    const [eventMode, setEventMode] = useState('Online');
    const [onlineMeetLink, setOnlineMeetLink] = useState('');
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEventImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const db = getFirestore();
            const storage = getStorage();
            const eventsCollection = collection(db, 'events');

            if (eventImage) {
                const imageRef = ref(storage, 'eventImages/' + eventImage.name);
                await uploadBytes(imageRef, eventImage);

                const imageUrl = await getDownloadURL(imageRef);

                const newEvent = {
                    eventName,
                    eventDescription,
                    eventDateTime,
                    eventImage: imageUrl,
                    registrationLink,
                    onlineMeetLink: eventMode === 'Online' ? onlineMeetLink : '',
                    venue: eventMode === 'Offline' ? eventVenue : '',
                    mode: eventMode,
                };

                const docRef = await addDoc(eventsCollection, newEvent);
            }

            setEventName('');
            setEventDescription('');
            setEventDateTime('');
            setEventImage(null);
            setRegistrationLink('');
            setOnlineMeetLink('');
            setEventVenue('');
            setMessage('Event created successfully!');
        } catch (error) {
            console.error('Event creation error:', error);
            setMessage(`Event creation error: ${error.message}`);
        }
    };

    return (
        <div className="event-creation-container">
            <h2 className="event-creation-title">Create Event</h2>
            <form className="event-creation-form" onSubmit={handleSubmit}>
                <div className="event-creation-group">
                    <label htmlFor="eventName" className="event-creation-label">
                        Event Name
                    </label>
                    <input
                        type="text"
                        id="eventName"
                        placeholder='Enter event name'
                        className="event-creation-input"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                </div>
                <div className="event-creation-group">
                    <label htmlFor="eventDescription" className="event-creation-label">
                        Event Description
                    </label>
                    <textarea
                        id="eventDescription"
                        placeholder='Enter event description'
                        className="event-creation-textarea"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="event-creation-group">
                    <label htmlFor="eventDateTime" className="event-creation-label">
                        Date and Time
                    </label>
                    <input
                        type="datetime-local"
                        id="eventDateTime"
                        className="event-creation-input"
                        value={eventDateTime}
                        onChange={(e) => setEventDateTime(e.target.value)}
                        required
                    />
                </div>
                <div className="event-creation-group">
                    <label htmlFor="eventImage" className="event-creation-label">
                        Event Image
                    </label>
                    <input
                        type="file"
                        id="eventImage"
                        className="event-creation-input"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div className="event-creation-group">
                    <label htmlFor="registrationLink" className="event-creation-label">
                        Registration Link
                    </label>
                    <input
                        type="text"
                        id="registrationLink"
                        placeholder='Enter registration link'
                        className="event-creation-input"
                        value={registrationLink}
                        onChange={(e) => setRegistrationLink(e.target.value)}
                        required
                    />
                </div>
                <div className="event-creation-group">
                    <label className="event-creation-label">Event Mode</label>
                    <div>
                        <input
                            type="radio"
                            id="onlineMode"
                            name="eventMode"
                            value="Online"
                            checked={eventMode === 'Online'}
                            onChange={() => setEventMode('Online')}
                        />
                        <label htmlFor="onlineMode">Online</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="offlineMode"
                            name="eventMode"
                            value="Offline"
                            checked={eventMode === 'Offline'}
                            onChange={() => setEventMode('Offline')}
                        />
                        <label htmlFor="offlineMode">Offline</label>
                    </div>
                </div>
                {eventMode === 'Online' && ( // Show Online Meet Link input conditionally
                    <div className="event-creation-group">
                        <label htmlFor="onlineMeetLink" className="event-creation-label">
                            Online Meet Link
                        </label>
                        <input
                            type="text"
                            id="onlineMeetLink"
                            placeholder='Enter your online meet link here'
                            className="event-creation-input"
                            value={onlineMeetLink}
                            onChange={(e) => setOnlineMeetLink(e.target.value)}
                            required
                        />
                    </div>
                )}
                {eventMode === 'Offline' && ( // Show venue input conditionally
                    <div className="event-creation-group">
                        <label htmlFor="eventVenue" className="event-creation-label">
                            Event Venue
                        </label>
                        <input
                            type="text"
                            id="eventVenue"
                            className="event-creation-input"
                            value={eventVenue}
                            onChange={(e) => setEventVenue(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit" className="event-creation-button">
                    Create Event
                </button>
            </form>
            {message && <p className="event-creation-message">{message}</p>}
        </div>
    );
};

export default EventCreation;
