import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CgProfile } from "react-icons/cg";

import { MdOutlineStarHalf } from "react-icons/md";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaCheck } from "react-icons/fa";








const ApplyJobs = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isWorker, setIsWorker] = useState(false);
    
    useEffect(() => {
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfo);
            checkWorker(parsedUserInfo);
        }   
    }, []);

    const navigate = useNavigate();

    const checkWorker = (userInfo) => {
        if (userInfo) {
            // Check if the user is a worker and navigate accordingly
            if (userInfo.isWorker) {
                setIsWorker(true);
            } 
        } else {
            navigate("/")
        }
    }

    const applyWorker = async (e) => {
        e.preventDefault();
        if(!localStorage.getItem("userInfo")) navigate("/login")
        try {
            const { data } = await axios.post("http://localhost:7000/api/users/createWorker", { email: userInfo.email });
            console.log(data);
            toast.success("Now You Are a Nav-Naari");
            setIsWorker(true);
            setUserInfo(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`max-w-[1400px] mx-auto mt-20 ${!isWorker? "h-[53.9vh]":""}`}>
            <div className="container py-4 flex flex-col items-center justify-center"> 
               {isWorker === false ? 
                    <div className='text-3xl text-[#25316D] font-bold flex flex-col items-center gap-10 '>
                        <h1>Be a Nav-Naari</h1>
                        <button onClick={applyWorker} className='px-5 py-3 bg-[#25316D] text-white shadow-lg'>Apply As A worker</button>
                    </div>
                    : <div className='container mx-auto px-7 max-w-[1100px] py-3 mt-10 text-[#25316D]'>
                       <div className="container flex text-[#25316D] items-center justify-between gap-5">
                        <div className='flex items-center gap-5'>
                        <CgProfile size={62}/>
                        <div className='flex items-start relative'>
                            <div >
                                    <h1 className='text-4xl font-semibold'>{userInfo.name}</h1>
                                <p className='text-md'>{userInfo.email}</p>
                                <p className='text-xl font-semibold'>Specialization: Cooking</p>
                            </div>
                            <div className='absolute left-[5rem] top-5 w-[10px] h-[10px] rounded-full bg-green-400'></div>
                            
                        </div>
                        </div>
                      
                        <div>
                            <h1>{userInfo.location}</h1>
                        </div>
                        <div> 
                            <div className='flex flex-col gap-1'>
                                <div className="flex item-center">
                                    <MdOutlineStarBorderPurple500 size={20}/>
                                    <MdOutlineStarHalf size={20}/>
                                    <MdOutlineStarPurple500 size={20}/>
                                </div>
                                <div className='flex items-center'>
                                    <FaCheck color='green'/>
                                    <span>Verified</span>
                                </div>
                            </div>
                        </div>
                       </div>
                       <div className='mt-12 text-black'>
                            <div>
                                <h1 className='text-3xl font-semibold'>New Work</h1>
                            </div>
                            <div className='mt-7 ml-4 flex flex-col gap-10'>
                                <div className='bg-[#eee] cursor-pointer px-4 py-4 flex items-center justify-between rounded-md shadow-md hover:scale-105 delay-150 transition-transform'>
                                    <div>
                                        <h1> Cooking Dinner</h1>
                                        <p>Location: PES University</p>
                                    </div>
                                    <div className='flex flex-col items-center gap-3'>
                                        <div>
                                            <p>Timing : 9:30AM </p>
                                        </div>
                                        <div className='text-white flex gap-4 text-center'>
                                            <button className='bg-green-600 px-4'>Yes</button>
                                            <button className='bg-red-600 px-4'>No</button>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                       </div>
                       <div className='mt-12 text-black'>
                           <div>
                                <h1 className='text-3xl font-semibold'>Previous Works</h1>
                           </div>
                           <div className='mt-7 ml-4 flex flex-col gap-10'>
                                <div className='bg-[#eee] cursor-pointer px-4 py-4 flex items-center justify-between rounded-md shadow-md hover:scale-105 delay-150 transition-transform'>
                                    <div className='flex flex-col gap-3 text-lg'>
                                        <h1>Cooking</h1>
                                        <p>Location: Banshankari</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <h1>Total Earning:</h1>
                                        <p>Rs300</p>
                                    </div>

                                </div>
                                <div className='bg-[#eee] cursor-pointer px-4 py-4 flex items-center justify-between rounded-md shadow-md hover:scale-105 delay-150 transition-transform'>
                                    <div className='flex flex-col gap-3 text-lg'>
                                        <h1>Cooking BreakFast</h1>
                                        <p>Location: Ring Road</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <h1>Total Earning:</h1>
                                        <p>Rs300</p>
                                    </div>

                                </div>
                                <div className='bg-[#eee] cursor-pointer px-4 py-4 flex items-center justify-between rounded-md shadow-md hover:scale-105 delay-150 transition-transform'>
                                    <div className='flex flex-col gap-3 text-lg'>
                                        <h1>Cooking</h1>
                                        <p>Location: Banshankari</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <h1>Total Earning:</h1>
                                        <p>Rs390</p>
                                    </div>

                                </div>
                                <div className='bg-[#eee] cursor-pointer px-4 py-4 flex items-center justify-between rounded-md shadow-md hover:scale-105 delay-150 transition-transform '>
                                    <div className='flex flex-col gap-3 text-lg'>
                                        <h1>Cooking</h1>
                                        <p>Location: Banshankari 3rd stage</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <h1>Total Earning:</h1>
                                        <p>Rs600</p>
                                    </div>

                                </div>
                           </div>
                       </div>
                       
                    </div>}
            </div>
            <ToastContainer/>
        </div>
    );
}

export default ApplyJobs;
