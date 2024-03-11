import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

const WorkerHireProfile = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [workerInfo, setWorkerInfo] = useState(null);
    const navigate = useNavigate()
    const [userInfo , setUserInfo] = useState(null)

    const fetchSingleWorker = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/workers/getSingle/getSingleWorker?id=${id}`);
            setWorkerInfo(response.data);
        } catch (error) {
            console.log('error', error);
            navigate("/")
        }
    }

    const messageHandler = async(e) =>{
        e.preventDefault();
       try {
        const message ="I am interested in your service. Please contact me."
        
        const res = await axios.post("http://localhost:7000/api/message/sendMessage", { message,sender: userInfo.email, receiver: workerInfo.email }) 
        console.log(res);
        toast.success(res.data.messsage)
        
       } catch (error) {
        console.log(error);
       }
    } 

    useEffect(() => {
        fetchSingleWorker();
     }, [id]), // Fetch worker information whenever the ID changes
    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
     }, [])
    
    
    return (
        <div className='my-20 container mx-auto'>
            <div className='py-10'>
                {workerInfo && (
                    <div>
                        <div className="flex justify-between items-center gap-10">
                            <div className='flex items-center gap-20'>
                                <div className='w-60 h-60 border-2 border-[#25316D] p-2 rounded-full'>
                                <img src={"https://media.istockphoto.com/id/1407759041/photo/confident-happy-beautiful-hispanic-student-girl-indoor-head-shot-portrait.jpg?s=2048x2048&w=is&k=20&c=eskue6p9gwUVS2t0Kpuw6rd7Sgu5nKgxsMD6Aqaba8I="} className='w-full rounded-full h-full object-cover' alt={workerInfo.name} />
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
                                     <div className='bg-[#25316D] px-3 py-2 rounded-md text-white shadow-md shadow-black'>
                                        <button className='' onClick={messageHandler}>Send Enquiry</button>
                                     </div>
                                     
                                     
                                </div>
                           </div>
                           
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default WorkerHireProfile;
