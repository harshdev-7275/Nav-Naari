import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isWorker, setIsWorker] = useState(false);
    const [location, setLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);
    const [locationFocused, setLocationFocused] = useState(false);
    const [phNumberFocused, setPhNumberFocused] = useState(false);

    const handleEmailFocus = () => {
        setEmailFocused(true);
    };

    const handleEmailBlur = () => {
        setEmailFocused(false);
    };

    const handlePasswordFocus = () => {
        setPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
        setPasswordFocused(false);
    };

    const handleNameFocus = () => {
        setNameFocused(true);
    };

    const handleNameBlur = () => {
        setNameFocused(false);
    };

    const handleLocationFocus = () => {
        setLocationFocused(true);
    };

    const handleLocationBlur = () => {
        setLocationFocused(false);
    };

    const handlePhNumberFocus = () => {
        setPhNumberFocused(true);
    };

    const handlePhNumberBlur = () => {
        setPhNumberFocused(false);
    };
    const navigate = useNavigate();
    

    const registerHandler = async (e) => {
        e.preventDefault();
        if (!email || !name || !password || !location || !phoneNumber) {
            toast.error("Please fill all the fields");
            return;
        }
        try {
          const response = await axios.post("http://localhost:7000/api/users/register", { email, name, password, isWorker, location, phoneNumber }, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }})
            // Call your registration API here

            toast.success('Registration successful! Please login.');
            setTimeout(()=>{
              navigate("/login")
            }, 1500)
            
           
           
            
        } catch (error) {
            console.error(`Error: ${error}`);
            toast.error('Registration failed!');
        }
    }

    return (
        <div className='overflow-x-hidden mt-32 px-10 text-black'>
            <div className='container mx-auto max-w-4xl'>
                <div>
                    <h1 className='text-6xl font-bold text-[#25316D]'>Register</h1>
                </div>
                <div className='mt-10 w-full mx-auto flex flex-col items-start'>
                    <form className='ml-7 mt-3 flex flex-col gap-6 text-lg' onSubmit={registerHandler}>
                        <div className='mb-6 relative w-[500px]'>
                            <label
                                htmlFor="email"
                                className={`absolute transition-all duration-300 ${emailFocused || email ? '-top-8 text-[#25316D] text-sm' : 'top-0 text-[#8D8D8D] text-base'} pointer-events-none`}
                            >
                                Email
                            </label>
                            <input
                                id='email'
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onFocus={handleEmailFocus}
                                onBlur={handleEmailBlur}
                                className='w-full py-2 border-b-4 border-[#25316D] outline-none focus:border-blue-500'
                            />
                        </div>
                        <div className='mb-6 relative'>
                            <label
                                htmlFor="name"
                                className={`absolute transition-all duration-300 ${nameFocused || name ? '-top-8 text-[#25316D] text-sm' : 'top-0 text-[#8D8D8D] text-base'} pointer-events-none`}
                            >
                                Name
                            </label>
                            <input
                                id='name'
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onFocus={handleNameFocus}
                                onBlur={handleNameBlur}
                                className='w-full py-2 border-b-4 border-[#25316D] outline-none focus:border-blue-500'
                            />
                        </div>
                        <div className='mb-6 relative'>
                            <label
                                htmlFor="password"
                                className={`absolute transition-all duration-300 ${passwordFocused || password ? '-top-8 text-[#25316D] text-sm' : 'top-0 text-[#8D8D8D] text-base'} pointer-events-none`}
                            >
                                Password
                            </label>
                            <input
                                id='password'
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onFocus={handlePasswordFocus}
                                onBlur={handlePasswordBlur}
                                className='w-full py-2 border-b-4 border-[#25316D] outline-none focus:border-blue-500'
                            />
                        </div>
                        <div>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                    checked={isWorker}
                                    onChange={e => setIsWorker(e.target.checked)}
                                />
                                <span className="ml-2 text-gray-700">Are you a worker?</span>
                            </label>
                        </div>
                        <div className='mb-6 relative'>
                            <label
                                htmlFor="location"
                                className={`absolute transition-all duration-300 ${locationFocused || location ? '-top-8 text-[#25316D] text-sm' : 'top-0 text-[#8D8D8D] text-base'} pointer-events-none`}
                            >
                                Location
                            </label>
                            <input
                                id='location'
                                type="text"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                onFocus={handleLocationFocus}
                                onBlur={handleLocationBlur}
                                className='w-full py-2 border-b-4 border-[#25316D] outline-none focus:border-blue-500'
                            />
                        </div>
                        <div className='mb-6 relative'>
                            <label
                                htmlFor="phNumber"
                                className={`absolute transition-all duration-300 ${phNumberFocused || phoneNumber ? '-top-8 text-[#25316D] text-sm' : 'top-0 text-[#8D8D8D] text-base'} pointer-events-none`}
                            >
                                Phone Number
                            </label>
                            <input
                                id='phNumber'
                                type="text"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                onFocus={handlePhNumberFocus}
                                onBlur={handlePhNumberBlur}
                                className='w-full py-2 border-b-4 border-[#25316D] outline-none focus:border-blue-500'
                            />
                        </div>
                        <div>
                            <button className='bg-[#25316D] text-white px-10 py-2' type='submit'>Register</button>
                        </div>
                    </form>
                    <div className='flex items-center my-4'>
                        <p className='text-base font-semibold text-center'>Already have an account? <Link to="/login" className='text-green-500'>Log In</Link>.</p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
