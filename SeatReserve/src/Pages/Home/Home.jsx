import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  return (
    <>
    <div>
        <NavBar/>
    </div>
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/src/assets/IMG_0143q.jpg")] bg-cover bg-center h-160 w-vw-100 '>
      <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110 '>Welcome to SeatReverve</h1>
    
    </div>
    <div>
      <h2 className='px-4 text-4xl md:text-[40px] md:leading-18 font-semibold max-w-[110]'>Choose your Line</h2>
    </div>
    <div className='flex flex-col w-full '>
      <div className='flex flex-row  rounded-lg md:px-20 items-center justify-between p-3 border-2 border-black my-2 w-vw-100'>
        <h5 className='md:text-2xl '>Coastal Line</h5>
        <p className='md:text-xl '>Colombo Fort to Beliaththa</p>
        <button onClick={() => navigate("/trainlist/1")} className=' cursor-pointer bg-primary md:text-2xl font-bold rounded-lg md:w-[200px] h-auto p-4 '>Book a Train</button>
      </div>
      <div className='flex flex-row  rounded-lg md:px-20 items-center justify-between p-3 border-2 border-black my-5 w-vw-100'>
        <h5 className='md:text-2xl '>Main Line</h5>
        <p className='md:text-xl '>Colombo Fort to Badulla</p>
        <button onClick={() => navigate("/trainlist/2")} className=' cursor-pointer bg-primary md:text-2xl font-bold rounded-lg md:w-[200px] h-auto p-4 '>Book a Train</button>
      </div>
      <div className='flex md:flex-row flex:col  rounded-lg md:px-20 items-center justify-between p-3 border-2 border-black my-5 w-vw-100'>
        <h5 className='md:text-2xl '>Nothern Line</h5>
        <p className='md:text-xl '>Colombo Fort to Kankasanthurai, Thalaimannar Pier</p>
        <button onClick={() => navigate("/trainlist/3")} className=' cursor-pointer bg-primary md:text-2xl  font-bold rounded-lg md:w-[200px] h-auto p-4  '>Book a Train</button>
      </div>
      <div className='flex flex-row  rounded-lg md:px-20 items-center justify-between p-3 border-2 border-black my-5 w-vw-100'>
        <h5 className='md:text-2xl '>Eastern Line</h5>
        <p className='md:text-xl '>Colombo Fort to Batticaloa, Trincomalee</p>
        <button onClick={() => navigate("/trainlist/4")} className=' cursor-pointer bg-primary md:text-2xl font-bold rounded-lg md:w-[200px] h-auto p-4 '>Book a Train</button>
      </div>
      
    </div>

    </>
  )
}

export default Home