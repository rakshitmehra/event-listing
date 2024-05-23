import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    const eventDate = new Date(event.eventDateTime);
    const formattedDate = `${eventDate.toDateString()},`;
    const formattedTime = `${eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    return (
        <div className="card m-4" style={{ width: '270px', borderRadius: '15px', overflow: 'hidden', border: '1px solid #000'}}>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img
            src={event.eventImage}
            alt={event.eventName}
            style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
            />
            <div className="card-body">
            <h5 className="card-title">{event.eventName}</h5>
            {/* <p className="card-text">Description: {event.eventDescription}</p> */}
            <p className="card-text">Date: {formattedDate} Time: {formattedTime}</p>
            <p className="card-text">Mode: {event.mode}</p>
            <Link to={`/event/${event.id}`} className="btn btn-primary">
                View Details
            </Link>
            </div>
        </div>
        </div>
    );
};

export default EventCard;
