import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateWorkerProfile = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        location: "",
        phoneNumber: "",
        profession: "",
        isAvailable: true
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send formData to the backend to create the worker profile
            await axios.post('http://localhost:7000/api/workers/createWorkerProfile', formData);
            console.log('Worker profile created successfully');
            setTimeout(()=>{
                navigate("/apply")
            }, 1000)
        } catch (error) {
            console.error('Error creating worker profile:', error);
        }
    };

    return (
        <div className='my-32 max-w-[1200px] mx-auto flex flex-col items-center justify-center text-[#25316D]'>
            <h1 className="text-4xl font-bold mb-8">Create Worker Profile</h1>
            <div>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center' >
                    <div className="mb-4 text-lg flex items-center gap-3">
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className='outline-none border-b-2 border-[#25316D]' />
                    </div>
                    <div className="mb-4 text-lg flex items-center gap-3">
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className='outline-none border-b-2 border-[#25316D]' />
                    </div>
                    <div className="mb-4 text-lg flex items-center gap-3">
                        <label>Location:</label>
                        <select name="location" value={formData.location} onChange={handleChange} required>
                            <option value="">Select Location</option>
                            <option value="JP Nagar">JP Nagar</option>
                            <option value="Banshankari">Banshankari</option>
                            <option value="RR Nagar">RR Nagar</option>
                        </select>
                    </div>
                    <div className="mb-4 text-lg flex items-center gap-3">
                        <label>Phone Number:</label>
                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className='outline-none border-b-2 border-[#25316D]' />
                    </div>
                    <div className="mb-4 text-lg flex items-center gap-3">
                        <label>Profession:</label>
                        <select name="profession" value={formData.profession} onChange={handleChange} required className='outline-none border-b-2 border-[#25316D]'>
                            <option value="">Profession</option>
                            <option value="cooking">Cooking</option>
                            <option value="arts">Arts</option>
                            <option value="health">Health and Wellness</option>
                            <option value="education">Education and Tutoring</option>
                            <option value="lifestyle">Home And LifeStyle</option>
                            <option value="consultation">Consultation Services</option>
                            <option value="parenting">Child-Care and Parenting</option>
                            <option value="fashion">Fashion and Beauty</option>
                        </select>
                    </div>
                    <div className="mb-4 text-lg flex items-center gap-3">
                        <label>Is Available:</label>
                        <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={() => setFormData(prevState => ({ ...prevState, isAvailable: !prevState.isAvailable }))}  className='outline-none border-b-2 border-[#25316D]' />
                    </div>
                    <button type="submit" className="bg-[#25316D] w-[200px] text-white px-4 py-2 rounded-md">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateWorkerProfile;
