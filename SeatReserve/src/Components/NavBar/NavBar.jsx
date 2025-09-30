import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(()=> {
      const storedUser = localStorage.getItem("user");
      if(storedUser){
        setUser(JSON.parse(storedUser));
      }
    },[]);

    const handleLogout = () =>{
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      window.location.href= "/";
    };

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
            { user?.type==="admin" && <Link onClick={()=> {scrollTo(0,0), setIsOpen(false)}} to='/manage'>Manage</Link>}
        </div>
        </div>
        <div className='flex items-center gap-4 m-4 top-0 right-0'>
          {user ? (
            <div className='gap-4 flex items-center'>
              <span className='font-bold'> Hello, {user.name}</span>
              <button onClick={handleLogout} className='px-4 py-1 sm:px-7 sm:py-2 bg-red-500 hover:bg-red-700 transition rounded-full  font-medium cursor-pointer'>Logout</button>
            </div>
          ):(

            <button onClick={()=>navigate('/login')} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-green-600 transition rounded-full  font-medium cursor-pointer'>Login</button>
          )}

       
        </div>
        <div>
         <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={()=> setIsOpen(!isOpen)}/>
        </div>
    </div>
    </>
  )
}

export default NavBar