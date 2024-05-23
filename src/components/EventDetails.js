import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventDetails.css';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const EventDetails = () => {
    const { eventId } = useParams();
    console.log(eventId);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        async function fetchEvent() {
            const db = getFirestore();
            const eventRef = doc(db, 'events', eventId);
            const eventDoc = await getDoc(eventRef);
            if (eventDoc.exists()) {
                setEvent(eventDoc.data());
            } else {
                console.log('Event not found');
            }
        }

        fetchEvent();
    }, [eventId]);

    const handleNotifyClick = () => {
        alert('You will be notified about this event.');
    };

    if (!event) {
        return <div>Event Not Found</div>;
    }

    const eventDate = new Date(event.eventDateTime);
    const formattedDate = `${eventDate.toDateString()},`;
    const formattedTime = `${eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    return (
        <div className="event-details-container">
            <img src={event.eventImage} alt={event.eventName} className="event-details-image" />
            <div className="event-details-content">
                <h2>{event.eventName}</h2>
                <p><b>Description:</b> {event.eventDescription}</p>
                <p><b>Date:</b> {formattedDate} <b>Time:</b> {formattedTime}</p>
                <p><b>Mode:</b> {event.mode}</p>
                <p><b>Meeting Link:</b> <a href={event.onlineMeetLink} target="_blank" style={{ textDecoration: "none" }} rel="noopener noreferrer">{event.onlineMeetLink}</a></p>
                <p><b>Venue:</b> {event.venue}</p>
                <button onClick={handleNotifyClick} className="notify-button">
                    Notify
                </button>
                
                <a href={event.registrationLink} target="_blank" style={{ textDecoration: 'none', margin: '20px' }} rel="noopener noreferrer">
                    <button className="register-button">Register here</button>
                </a>
                
            </div>
        </div>
    );
};

export default EventDetails;
