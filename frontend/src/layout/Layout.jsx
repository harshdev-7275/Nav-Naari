import React from 'react'
import Header from "../components/Header"
import Footer from '../components/Footer'

const Layout = ({children}) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header/>
        <div className='max-w-[1400px] container mx-auto'>{children}</div>
        <div className=''>
        <Footer/>
        </div>
        
    </div>
  )
}

export default Layout