import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [logoutClicked, setLogoutClicked] = useState(false);


    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, [logoutClicked]);

    const logoutHandler = async (e)=>{
       
       const data =  await axios.post("http://localhost:7000/api/auth/logout")
       console.log(userInfo);
       setUserInfo(null)
       localStorage.removeItem('userInfo')
       toast.success("Logout Successfully")
       setLogoutClicked(!logoutClicked);
       
    }
    

  return (
   <nav className='fixed px-20 bg-white z-50'>
    <div className='flex w-[93.5vw] items-center justify-between'>
    <div className='flex-1'>
        <h1 className='text-6xl font-semibold text-[#25316D]'><Link to="/">Nav-Naari</Link></h1>
    </div>
    <div className='flex items-center justify-center gap-20'>
        <ul className='text-lg text-[#25316D] flex items-center justify-center gap-8 font-semibold'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Hire a talent</Link></li>
            <li><Link to="/">Apply For Jobs</Link></li>
        </ul>
        <button className='px-20 py-5 bg-[#25316D] text-white text-lg'>
    {userInfo ? <Link to="" onClick={logoutHandler}>Logout</Link> : <Link to="/login">Log In</Link>}
</button>
    </div>
    </div>
    <ToastContainer/>
   </nav>
  )
}

export default Header