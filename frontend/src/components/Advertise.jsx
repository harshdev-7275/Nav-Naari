import React from 'react'
import A1 from "../img/cooking3.webp"
import A2 from "../img/women-image.jpg"
import A3 from "../img/about-4.jpg"
import A4 from "../img/carousel-2.jpg"

const Advertise = () => {
  return (
    <d
    iv className='ml-8 flex items-center justify-center gap-48 '>
        <div className='flex flex-col flex-wrap relative w-[500px] bg-white'>
            <div className='w-[300px]'>
                <img src={A1} className='w-full h-full object-cover' alt="" />
            </div>
            <div className='w-[200px] absolute left-80 top-5'>
                <img src={A2} alt="" />
            </div>
            <div className='w-[350px]'>
                <img src={A3} alt="" />
            </div>
            <div className='w-[320px] absolute left-60 bottom-0'>
                <img src={A4} alt="" />
            </div>
        </div>
        <div className='z-30 flex flex-col gap-8'>
            <div className='flex flex-col gap-7'>
                <h1 className='text-5xl font-bold'>We Help To Get The Best Service And Enhance A Talent</h1>
                <p className='text-lg font-light'>Through Navnaari, women can achieve greater financial independence and autonomy. By earning income from their services, women can become less reliant on others for financial support and decision-making, thereby increasing their freedom and agency.</p>
            </div>
           <ul className='flex flex-col gap-2 ml-8'>
                <li className='flex items-center gap-3 hover:translate-x-1 transition-transform cursor-pointer text-lg font-light'> 
                    <div className=' w-3 h-3 bg-green-400 rounded-full'></div>
                    <h1>Employment Opportunities</h1>
                </li>
                <li className='flex items-center gap-3 hover:translate-x-1 transition-transform cursor-pointer text-lg font-light'> 
                    <div className=' w-3 h-3 bg-green-400 rounded-full'></div>
                    <h1>Financial Independence</h1>
                </li>
                <li className='flex items-center gap-3 hover:translate-x-1 transition-transform cursor-pointer text-lg font-light'> 
                    <div className=' w-3 h-3 bg-green-400 rounded-full'></div>
                    <h1>Entrepreneurship Support</h1>
                </li>
           </ul>
           <div className='ml-8 bg-[#25316D] text-xl text-white w-[200px] flex items-center justify-center px-3 py-4'>
            <button>Read More</button>
           </div>
        </div>
    </d>
  )
}

export default Advertise