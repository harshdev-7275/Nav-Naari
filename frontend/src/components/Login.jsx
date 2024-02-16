import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"

const Login = () => {
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userInfo,setUserInfo]  = useState({})
    const navigate = useNavigate();

    useEffect(() => {
      if(localStorage.getItem("userInfo")){
        navigate("/");
        
      }
    }, [])
    

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

    const handleConfirmPasswordFocus = () => {
        setConfirmPasswordFocused(true);
    };

    const handleConfirmPasswordBlur = () => {
        setConfirmPasswordFocused(false);
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            if (email.length > 0 && password.length > 0 && confirmPassword.length > 0) {
                if (password === confirmPassword) {
                    const response = await axios.post("http://localhost:7000/api/auth/login", { email, password }, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                    setUserInfo(response.data);
                    localStorage.setItem("userInfo", JSON.stringify(response.data));
                    toast.success(`Welcome, ${response.data.name}`);
                    
                    setTimeout(() => {
                        navigate("/")
                    }, 1000);
                    console.log(response.data);
                } else {
                    toast.error('Passwords do not match');
                }
            } else {
                toast.error('Please fill all the fields');
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            toast.error('Invalid Credentials!');
        }
    }

    return (
        <div className='overflow-x-hidden h-screen mt-32 px-10 text-black'>
            <div className='container mx-auto max-w-4xl'>
                <div>
                    <h1 className='text-6xl font-bold text-[#25316D]'>Login</h1>
                </div>
                <div className='mt-10 w-full mx-auto flex flex-col items-start'>
                    <form className='ml-7 mt-3 flex flex-col gap-10 text-lg' onSubmit={loginHandler}>
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
                        <div className='mb-6 relative'>
                            <label
                                htmlFor="confirmPassword"
                                className={`absolute transition-all duration-300 ${confirmPasswordFocused || confirmPassword ? '-top-8 text-[#25316D] text-sm' : 'top-0 text-[#8D8D8D] text-base'} pointer-events-none`}
                            >
                                Confirm Password
                            </label>
                            <input
                                id='confirmPassword'
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                onFocus={handleConfirmPasswordFocus}
                                onBlur={handleConfirmPasswordBlur}
                                className='w-full py-2 border-b-4 border-[#25316D] outline-none focus:border-blue-500'
                            />
                        </div>
                        <div>
                            <button className='bg-[#25316D] text-white px-10 py-2' type='submit'>Login</button>
                        </div>
                    </form>
                    <div className='flex items-center mt-4'> 
                        <p className='text-base font-semibold text-center'>If You're New Signup <Link to="/register" className='text-green-500'>Here</Link>.</p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
