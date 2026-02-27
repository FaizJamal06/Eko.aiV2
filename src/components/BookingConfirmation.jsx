import React from 'react';
import './BookingConfirmation.css';

const BookingConfirmation = ({ eventDetails }) => {
    if (!eventDetails) return null;

    return (
        <div className="booking-confirmation fade-in">
            <div className="confirmation-header">
                <svg xmlns="http://www.w3.org/2000/svg" className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h3>Booking Confirmed!</h3>
            </div>

            <div className="event-details-card">
                <div className="detail-row">
                    <span className="detail-label">Event:</span>
                    <span className="detail-value">{eventDetails.title || 'Meeting'}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{eventDetails.date}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">{eventDetails.time}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">{eventDetails.duration || '30'} minutes</span>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;
