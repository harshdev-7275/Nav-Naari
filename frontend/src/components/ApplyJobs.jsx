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
import Bookings from './Bookings';




const ApplyJobs = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [isWorker, setIsWorker] = useState(false);
    const [loading, setLoading] = useState(true);
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");
    useEffect(() => {
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfo);
            checkWorker(parsedUserInfo);
           
        }
        
    }, []);
   useEffect(() => {
        if (userInfo) {
            fetchEquiry();
        }
    }, [userInfo]);
    

    const fetchEquiry = async () => {
         const id = userInfo?._id;
        console.log("dad", id); // Changed from `receiver` to `id`

        try {
            const res = await axios.get(`http://localhost:7000/api/workers/getBookings`,{
                params: {
                    workerId:id
                }
            },{
                withCredentials: true
            });
            console.log(res.data.bookings);
            setEnquiries(res.data.bookings); // Changed from `res.data.messages` to `res.data.bookings`
            console.log(res);
            setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
            console.log(error);
            setLoading(false); // Set loading to false even if there's an error
        }
    }

    const navigate = useNavigate();

    const checkWorker = (userInfo) => {
        if (userInfo) {
            if (userInfo.isWorker) {
                setIsWorker(true);
            }
        } else {
            navigate("/");
        }
    }

    const applyWorker = async (e) => {
        e.preventDefault();
        if (!localStorage.getItem("userInfo")) navigate("/login");
        try {
            const { data } = await axios.post("http://localhost:7000/api/users/createWorker", { email: userInfo.email });
            toast.success("Now You Are a Nav-Naari");
            setIsWorker(true);
            setUserInfo(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/createWorkerProfile");
        } catch (error) {
            console.log(error);
        }
    }
    

    const uploadImage = async (e) => {
        e.preventDefault()
        try {
           
           const res =  await axios.post("http://localhost:7000/api/message/deleteSingleMessage", {
                id
            });
            console.log(res);
            toast.success("Message deleted successfully");
            navigate("/apply")
            
            fetchEquiry();
        } catch (error) {
            console.log(error);
        }
    }
    


    return (
        <div className={`max-w-[1400px] mx-auto mt-20 ${!isWorker? "h-[64.7vh]":""}`}>
            <div className="container py-4 flex flex-col items-center justify-center"> 
               {isWorker === false ? 
                    <div className='text-3xl text-[#25316D] font-bold flex flex-col items-center gap-10 '>
                        <h1>Be a Nav-Naari</h1>
                        <button onClick={applyWorker} className='px-5 py-3 bg-[#25316D] text-white shadow-lg'>Apply As A worker</button>
                    </div>
                    : <div className='container mx-auto px-7 max-w-[1100px] py-3 mt-10 text-[#25316D]'>
                       <div className="container flex text-[#25316D] items-center justify-between gap-5">
                        <div className='flex items-center gap-5'>
                       <div>
                       <CgProfile size={62}/>
                        <div>
                        <input type="file" onChange= {(e)=> setImage(e.target.files[0])} placeholder='Upload'/>
                        <button onClick={uploadImage}>Upload</button>
                        </div>
                       </div>
                        <div className='flex items-start relative'>
                            <div >
                                    <h1 className='text-4xl font-semibold'>{userInfo.name}</h1>
                                <p className='text-md'>{userInfo.email}</p>
                                <p className='text-xl font-semibold'>Specialization: </p>
                            </div>
                           
                            
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
                                {loading ? (
                                    <p>Loading...</p>
                                ) : enquiries ? (
                                    enquiries.map((enquiry) => (
                                       <Bookings key={enquiry._id} {...enquiry} enquiry={enquiry}/>
                                    ))
                                ) : (
                                    <p>No new enquiries</p>
                                )}
                            </div>
                        </div>
                       <div className='mt-12 text-black'>
                           <div>
                                <h1 className='text-3xl font-semibold'>Previous Works</h1>
                           </div>
                           <div className='mt-7 ml-4 flex flex-col gap-10'>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : enquiries ? (
                                    enquiries.map((enquiry) => (
                                       <div key={enquiry._id}>
                                            <div>No previous works</div>
                                       </div>
                                    ))
                                ) : (
                                    <p>No new enquiries</p>
                                )}
                           </div>
                       </div>
                       
                    </div>}
            </div>
            <ToastContainer/>
        </div>
    );
}

export default ApplyJobs;
