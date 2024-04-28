import React from 'react';

const Calendar = ({ onSelectDate }) => {
    const handleDateClick = (date) => {
        onSelectDate(date);
    };

    return (
        <div className="calendar">
            {/* Your calendar implementation goes here */}
            {/* Example: */}
            <div>
                <p>Select Date:</p>
                <button onClick={() => handleDateClick(new Date())}>Today</button>
                {/* Render your calendar UI here */}
            </div>
        </div>
    );
}

export default Calendar;
