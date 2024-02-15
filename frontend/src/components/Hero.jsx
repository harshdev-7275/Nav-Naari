import React from 'react';
import TestimonialCaraousal from './TestimonialCaraousal';
import ServiceButton from './Buttons/ServiceButton.jsx';
import { Link } from 'react-router-dom';
import Category from './Category.jsx';
import Advertise from './Advertise.jsx';




const Hero = () => {
  

  return (
    <div className='bg-[#eee]'>
        <div className='relative'>
            <div className='bg-black'>
            <TestimonialCaraousal/>
            </div>
            
         <div className='absolute top-[20%] left-24 z-50 flex flex-col items-start justify-start gap-7'>
            <h1 className='text-6xl text-white z-50 font-bold w-[50rem]'>"Empower a woman, empower a community."</h1> 
            <p className='text-white text-2xl w-[55rem]'>  Navnaari can provide employment opportunities for women by allowing them to offer their services to the community.    </p>
            <div className='flex items-center gap-6'>
                <Link to="/findtalent"><ServiceButton name="Search A Service" col="25316D"/></Link>
                <Link to="/applyjobs"><ServiceButton name="Give A Service" col="25316D"/></Link>
            </div>
        </div>
        <div className='bg-[#25316D] text-white text-2xl italic text-center py-2'>
            <h1>"Navnaari empowers women through employment opportunities, transforming lives one job at a time."</h1>
        </div>
        </div>
        <div>
            <Category />
        </div>
        <div className='py-7'>
            <Advertise />
        </div>
        
       

    </div>
  );
};

export default Hero; 
