import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import { useNavigate } from 'react-router-dom'

function Search() {
  const navigate = useNavigate();
  return (
    <>
    <div>
      <NavBar/>
    </div>
    <div className='mt-40 md:mt-40 bg-transparent flex flex-col items-left justify-center  px-6 md:px-16 lg:px-36 gap-4 max-w-7xl mx-auto'>
      <div className='flex flex-col text-2xl gap-4 bg-white rounded-lg p-6'>
        <h3 className='font-bold text-black underline' >Search Seats</h3>
      
        <label className='text-black'>From :</label>
        <select  className='text-black bg-secondary rounded-lg'>
          
          <option>Colombo Fort</option>
          <option>Maradana</option>
          <option>Galle</option>
        </select>
        <label className='text-black'>To :</label>
        <select className='text-black bg-secondary rounded-lg'>
          {/* <option selected>Select</option> */}
          <option>Galle</option>
          <option>Matara</option>
          <option>Beliaththa</option>
        </select>
        <label className='text-black'>Date :</label>
        <input type='date' className='text-black font-thin bg-secondary rounded-lg'/>
        <button className='cursor-pointer bg-primary px-4 py-2 rounded-lg text-white mt-6' onClick={()=> navigate('/class')}>Search</button>
      </div>
      </div>
      <div>
        {/* Search Results */}
      </div>
    </>
  )
}

export default Search