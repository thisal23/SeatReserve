import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const {user} = useUser();
    const {openSignIn} = useClerk();

  return (
    <>
    <div className='fixed top-0 left-0 z-50 w-full flex  items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
        <div className='flex-shrink-0'>
            <Link to='/' className='max-md:flex-1 flex items-center '>
            <img src='/seat.png' alt='logo' className='w-10 h-10'/>
        </Link>
        </div>
        <div className='flex-1 flex justify-center items-center '>
        <div className={`max-md: absolute max-md:top-0 max-md:left-0 max-md:font-medium
                        max-md:text-lg z-50 flex flex-col md:flex-row items-center
                        max-md:justify-center gap-8 min-md:px-8 py-3
                        max-md:h-screen
                        min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md: border
                        border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`} >
            <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={()=> setIsOpen(!isOpen)}/>
            <Link onClick={()=> {scrollTo(0,0), setIsOpen(false)}} to='/'>Home</Link>
            <Link onClick={()=> {scrollTo(0,0), setIsOpen(false)}} to='/contact'>Contact</Link>
            <Link onClick={()=> {scrollTo(0,0), setIsOpen(false)}} to='/profile'>Profile</Link>
        </div>
        </div>
        <div className='flex items-center gap-4 m-4 top-0 right-0'>
        {
          !user ? (
             <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full  font-medium cursor-pointer'>Login</button>
          ) : (
              <UserButton/>
          )
        }
       
        </div>
        <div>
         <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={()=> setIsOpen(!isOpen)}/>
        </div>
    </div>
    </>
  )
}

export default NavBar