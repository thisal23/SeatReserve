import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import { useNavigate, useParams } from 'react-router-dom'

function TrainList() {

  const {line} = useParams();
  const [lineName, setLineName] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
  switch(line){
    case "1":
      setLineName("Coastal Line");
      break;
    case "2":
      setLineName("Main Line");
      break;
    case "3":
      setLineName("Nothern Line");
      break;
    case "4":
      setLineName("Eastern Line");
      break;
    default:
      setLineName("Unknown Line");
      break;
  }
  }, [line])
  return (
    <>
    <div>
      <NavBar/>
    </div>
    <div className='flex flex-col items-left justify-center mt-24 ml-6'>
      <h3 className='text-2xl font-bold '>{lineName} booking Trains</h3>
      {/* Dummy data */}
      <div>
        <table className='w-full mt-4'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>Turn No</th>
              <th className='border px-4 py-2'>Name</th>
              <th className='border px-4 py-2'>From</th>
              <th className='border px-4 py-2'>To</th>
              <th className='border px-4 py-2'>Departure</th>
              <th className='border px-4 py-2'></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border px-4 py-2'>8057</td>
              <td className='border px-4 py-2'>Galu Kumari</td>
              <td className='border px-4 py-2'>Beliaththa</td>
              <td className='border px-4 py-2'>Maradana</td>
              <td className='border px-4 py-2'>05:25 AM</td>
              <td className='border px-4 py-2'><button onClick={()=>navigate("/search")} className='cursor-pointer bg-primary px-4 py-2 rounded-lg text-white'>Book Now</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default TrainList