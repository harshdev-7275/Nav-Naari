import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

// Calendar Component
const Calendar = ({ onSelectDate, selectedDate }) => {
    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        onSelectDate(selectedDate);
    };

    return (
        <div className="calendar mt-6">
            <p className="text-lg font-semibold mb-2">Select Date:</p>
            <input type="date" onChange={handleDateChange} className={`border border-gray-300 rounded-md px-3 py-2 ${selectedDate ? 'bg-gray-800 text-white' : ''}`} />
        </div>
    );
}

// Time Slots Component
const TimeSlots = ({ date, selectedTimeSlot, onSelectTimeSlot }) => {
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        // Placeholder for demonstration
        const availableTimeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'];
        setTimeSlots(availableTimeSlots);
    }, [date]);

    const handleTimeSlotClick = (timeSlot) => {
        onSelectTimeSlot(timeSlot);
    };

    return (
        <div className="time-slots mt-6">
            <p className="text-lg font-semibold mb-2">Select Time Slot:</p>
            <div className="flex flex-wrap gap-2">
                {timeSlots.map((slot, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleTimeSlotClick(slot)} 
                        className={`py-2 px-4 rounded ${selectedTimeSlot === slot ? 'bg-blue-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'} font-bold`}
                    >
                        {slot}
                    </button>
                ))}
            </div>
        </div>
    );
}

// UserBookings Component
const UserBookings = ({ workerId }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                const { _id: userId } = JSON.parse(localStorage.getItem('userInfo'));
                const response = await axios.get(`http://localhost:7000/api/users/bookings?userId=${userId}&workerId=${workerId}`, {
                    withCredentials: true
                });
                setBookings(response.data);
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch bookings.");
            }
        };

        fetchUserBookings();
    }, [workerId]);

    return (
        <div className="my-4">
            <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
            <ul>
                {bookings.map((booking, index) => (
                    <li key={index} className="border-b py-2">
                        <div>
                            <span className="font-semibold">Date:</span> {isValidDate(booking.date) ? new Date(booking.date).toLocaleDateString() : 'Invalid Date'} <br />
                            <span className="font-semibold">Time:</span> {booking.time}
                        </div>
                    </li>
                ))}
            </ul>
            <ToastContainer />
        </div>
    );
}

// Helper function to check if a date string is valid
const isValidDate = (dateString) => {
    return (new Date(dateString) !== 'Invalid Date' && !isNaN(new Date(dateString)));
}


const WorkerHireProfile = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [workerInfo, setWorkerInfo] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSingleWorker = async () => {
            try {
                const response = await axios.get(`http://localhost:7000/api/workers/getSingle/getSingleWorker?id=${id}`);
                setWorkerInfo(response.data);
            } catch (error) {
                console.log('error', error);
                navigate("/");
            }
        };
        fetchSingleWorker();
    }, [id, navigate]);

    const bookAppointment = async () => {
        try {
            if (!selectedDate || !selectedTimeSlot) {
                toast.error("Please select both date and time slot.");
                return;
            }
            
            const { _id: userId } = JSON.parse(localStorage.getItem('userInfo'));
            const workerId = workerInfo.user;
            const res = await axios.post("http://localhost:7000/api/users/book", { userId, workerId, date: selectedDate, time: selectedTimeSlot });
            console.log(res);
            toast.success("Appointment booked successfully.");
        } catch (error) {
            console.log(error);
            toast.error("Failed to book appointment.");
        }
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const handleTimeSlotSelection = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
    }

    return (
        <div className='my-20 container mx-auto min-h-[530px]'>
            <div className='py-10'>
                {workerInfo && (
                    <div>
                        <div className="flex justify-between items-center gap-10">
                            <div className='flex items-center gap-20'>
                                <div className='w-60 h-60 border-2 border-[#25316D] p-2 rounded-full'>
                                    <img src={workerInfo.avatar} className='w-full rounded-full h-full object-cover' alt={workerInfo.name} />
                                </div>
                                <div className='flex items-center gap-36 justify-between'>
                                    <div className='text-3xl flex flex-col gap-3'>
                                        <h1 className='font-semibold'>{workerInfo.name}</h1>
                                        <p className='font-semibold'>{workerInfo.email}</p>
                                    </div>
                                    <div className='text-3xl'>
                                        <p className='font-semibold'>{workerInfo.location}</p>
                                        <p className='uppercase'>{workerInfo.profession}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='font-semibold text-3xl flex flex-col-reverse gap-4 items-center'>
                                    <div className='flex justify-center items-center gap-2 bg-green-300 px-7 py-2 rounded-md shadow-sm shadow-black'>
                                        <div className='w-[10px] h-[10px] bg-green-600 rounded-full'></div>
                                        <h1>Available</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Calendar Component */}
                        <div>
                            <Calendar onSelectDate={handleDateChange} selectedDate={selectedDate} />
                        </div>
                        {/* Time Slot Component */}
                        <div>
                            <TimeSlots date={selectedDate} onSelectTimeSlot={handleTimeSlotSelection} selectedTimeSlot={selectedTimeSlot} />
                        </div>
                        {/* Booking Confirmation Button */}
                        <div>
                            <button onClick={bookAppointment} disabled={!selectedDate || !selectedTimeSlot} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-6">Book Appointment</button>
                        </div>
                    </div>
                )}
            </div>
            {/* UserBookings Component */}
            <div className="py-10">
                {workerInfo && <UserBookings workerId={workerInfo._id} />}
            </div>
            <ToastContainer />
        </div>
    );
}

export default WorkerHireProfile;
