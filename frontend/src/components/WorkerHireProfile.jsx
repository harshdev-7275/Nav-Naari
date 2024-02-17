import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom"

const WorkerHireProfile = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [workerInfo, setWorkerInfo] = useState(null);
    const navigate = useNavigate()

    const fetchSingleWorker = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/workers/getSingle/getSingleWorker?id=${id}`);
            setWorkerInfo(response.data);
        } catch (error) {
            console.log('error', error);
            navigate("/")
        }
    }

    useEffect(() => {
        fetchSingleWorker();
    }, [id]); // Fetch worker information whenever the ID changes

    return (
        <div className='my-20 container mx-auto'>
            <div className='py-10'>
                {workerInfo && (
                    <div>
                        <div className="flex items-center gap-10">
                            <div className='w-60 h-60 border-2 border-[#25316D] p-2 rounded-full'>
                                <img src={"https://media.istockphoto.com/id/1407759041/photo/confident-happy-beautiful-hispanic-student-girl-indoor-head-shot-portrait.jpg?s=2048x2048&w=is&k=20&c=eskue6p9gwUVS2t0Kpuw6rd7Sgu5nKgxsMD6Aqaba8I="} className='w-full rounded-full h-full object-cover' alt={workerInfo.name} />
                            </div>
                            <div className='text-3xl flex flex-col gap-3'>
                                <h1 className='font-semibold'>{workerInfo.name}</h1>
                                <p className='font-semibold'>{workerInfo.email}</p>
                                <p className='font-semibold'>{workerInfo.location}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-[10px] h-[10px] bg-green-600 rounded-full'></div>
                                <div>Available</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WorkerHireProfile;
