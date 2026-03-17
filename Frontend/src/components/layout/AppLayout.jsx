import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'

const AppLayout = () => {
  return (
    <>
    <div className='bg-[#FFFFF0] w-full h-fit overflow-x-hidden relative'>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
    </>
  )
}

export default AppLayout