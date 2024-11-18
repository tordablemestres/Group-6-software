// client/src/components/CalendarComponent.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './CalendarComponent.css';

function CalendarComponent() {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', color: '#000000' });

    useEffect(() => {
        // Fetch events from backend
        const fetchEvents = async () => {
            try {
                const res = await axios.get('/api/events');
                setEvents(res.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    // Update selectedDateEvents when date or events change
    useEffect(() => {
        const eventsForSelectedDate = events.filter((event) => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getFullYear() === date.getFullYear() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getDate() === date.getDate()
            );
        });
        setSelectedDateEvents(eventsForSelectedDate);
    }, [date, events]);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleAddEvent = async () => {
        try {
            const eventData = {
                title: newEvent.title,
                date: date,
                color: newEvent.color,
            };
            const res = await axios.post('/api/events', eventData);
            setEvents([...events, res.data]);
            setNewEvent({ title: '', color: '#000000' });
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleEventClick = async (eventId) => {
        const eventToUpdate = events.find((event) => event._id === eventId);
        if (eventToUpdate) {
            if (!eventToUpdate.completed) {
                // Mark event as completed
                try {
                    const res = await axios.put(`/api/events/${eventId}`, { completed: true });
                    setEvents(events.map((event) => (event._id === eventId ? res.data : event)));
                } catch (error) {
                    console.error('Error updating event:', error);
                }
            } else {
                // Hide the event from the interface
                try {
                    const res = await axios.put(`/api/events/${eventId}`, { hidden: true });
                    setEvents(events.filter((event) => event._id !== eventId));
                } catch (error) {
                    console.error('Error updating event:', error);
                }
            }
        }
    };

    // Add event indicators to calendar tiles
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const eventsForDate = events.filter((event) => {
                const eventDate = new Date(event.date);
                return (
                    eventDate.getFullYear() === date.getFullYear() &&
                    eventDate.getMonth() === date.getMonth() &&
                    eventDate.getDate() === date.getDate()
                );
            });
            return (
                <div>
                    {eventsForDate.map((event) => (
                        <div
                            key={event._id}
                            className={`event-tile ${event.completed ? 'completed' : ''} ${event.hidden ? 'hidden' : ''}`}
                            onClick={() => handleEventClick(event._id)}
                        >
                            {event.title}
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div>
            <h2>Calendar</h2>
            <Calendar
                onChange={handleDateChange}
                value={date}
                tileContent={tileContent}
            />
            <h3>Add Event on {date.toDateString()}</h3>
            <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <input
                type="color"
                value={newEvent.color}
                onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
            />
            <button onClick={handleAddEvent}>Add Event</button>
            <h3>Events on {date.toDateString()}</h3>
            <ul>
                {selectedDateEvents.map((event) => (
                    <li key={event._id}>
                        <span
                            style={{
                                textDecoration: event.completed ? 'line-through' : 'none',
                                color: event.completed ? 'gray' : event.color,
                                cursor: 'pointer',
                            }}
                            onClick={() => handleEventClick(event._id)}
                        >
                            {event.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CalendarComponent;
