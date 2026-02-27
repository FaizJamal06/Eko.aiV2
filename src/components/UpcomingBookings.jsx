import React from 'react';
import './UpcomingBookings.css';

const UpcomingBookings = ({ events }) => {
    if (!events || events.length === 0) return null;

    return (
        <div className="upcoming-bookings">
            <h3 className="section-title">Upcoming Bookings</h3>
            <div className="events-list">
                {events.slice(0, 3).map((event, index) => (
                    <div key={index} className="event-item">
                        <div className="event-date-box">
                            <span className="event-month">{event.month}</span>
                            <span className="event-day">{event.day}</span>
                        </div>
                        <div className="event-details">
                            <h4 className="event-title">{event.title}</h4>
                            <p className="event-time">{event.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingBookings;
