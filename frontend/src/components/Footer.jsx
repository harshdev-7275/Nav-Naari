import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";








const Footer = () => {
  return (
    <footer className='bg-[#2B3940] text-white'>
        <div className='max-w-[1200px] container mx-auto py-12 flex gap-14 justify-between'>
            <div>
                <h1 className='text-lg font-medium text-start'>Company</h1>
                <ul>
                    <li className='font-light flex items-center gap-2 hover:translate-x-1 transition-transform'>
                        <IoIosArrowForward/>
                        <Link>AboutUs</Link>
                    </li>
                    <li className='font-light flex items-center gap-2 hover:translate-x-1 transition-transform'>
                        <IoIosArrowForward/>
                        <Link>Contact Us</Link>
                    </li>
                    <li className='font-light flex items-center gap-2 hover:translate-x-1 transition-transform'>
                        <IoIosArrowForward/>
                        <Link>Our Services</Link>
                    </li>
                    <li className='font-light flex items-center gap-2 hover:translate-x-1 transition-transform'>
                        <IoIosArrowForward/>
                        <Link>Privacy Policy</Link>
                    </li>
                    <li className='font-light flex items-center gap-2 hover:translate-x-1 transition-transform'>
                        <IoIosArrowForward/>
                        <Link>Terms & Conditions</Link>
                    </li>
                </ul>
            </div>
            <div>
                <h1 className='text-lg font-medium text-start'>Quick Links</h1>
                <ul>
                    <li className='font-light flex items-center gap-2 hover:translate-x-1 transition-transform'>
                        <IoIosArrowForward/>
                        <Link>AboutUs</Link>
                    </li>
                    <li className='font-light flex items-center gap-2 hover:translate-x-1 transition-transform'>
                        <IoIosArrowForward/>
                        <Link>Contact Us</Link>
                    </li>
                    <li className='font-light flex items-center gap-2 hover:translate-x-1 transition-transform'>
                        <IoIosArrowForward/>
                        <Link>Our Services</Link>
                    </li>
                    <li className='font-light flex items-center gap-2 hover:translate-x-1 transition-transform'>
                        <IoIosArrowForward/>
                        <Link>Privacy Policy</Link>
                    </li>
                    <li className='font-light flex items-center gap-2 hover:translate-x-1 transition-transform'>
                        <IoIosArrowForward/>
                        <Link>Terms & Conditions</Link>
                    </li>
                </ul>
            </div>
            <div className='flex flex-col gap-4'>
                <h1 className='text-lg font-medium text-start'>Contact</h1>
                <ul className='font-light'>
                    <li className='flex items-center'>
                        <IoLocationSharp size={20}/>
                        <p>Bengaluru, Karnataka</p>
                    </li>
                    <li className='flex items-center'>
                        <IoIosCall size={20}/>
                        <p>+012 345 67890</p>
                    </li>
                    <li className='flex items-center'>
                        <IoIosMail size={20}/>
                        <p>info@example.com</p>
                    </li>
                </ul>
                
            </div>
            <div className='flex items-center gap-4 pt-2'>
                    <div className='hover:-translate-y-2 cursor-pointer transition-all delay-75'><FaFacebookF size={32}/></div>
                    <div className='hover:-translate-y-2 cursor-pointer transition-all delay-75'><FaLinkedin size={32}/></div>
                    <div className='hover:-translate-y-2 cursor-pointer transition-all delay-75'><FaTwitter size={32}/></div>
                    <div className='hover:-translate-y-2 cursor-pointer transition-all delay-75'><FaYoutube size={32}/></div>
                </div>
        </div>
    </footer>
  )
}

export default Footer