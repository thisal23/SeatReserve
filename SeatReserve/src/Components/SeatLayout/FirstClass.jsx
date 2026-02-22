import React, { useState,useEffect } from 'react'
import Seat from '../Seat/Seat'
import {genarateSeats} from '../../utils/genarateSeats'
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../api/api';

function FirstClass({type, variant, rows, colss}) {
    const [selected, setSelected] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const turn_No = location?.state.turn_No;
    const tClass = location.state?.tClass;
    const compartment = location.state?.compartment;
    const travel_Date = location.state?.travel_Date;
    const sectionS = location.state?.sectionS;
    const sectionE = location.state?.sectionE;
    const from = location.state?.from;
    const to = location.state?.to;
    

    // const seats = genarateSeats(rows, cols, type);
    const seats = genarateSeats(13, 4, 'A');
    const cols = 4;

    console.log(turn_No, tClass, compartment, travel_Date, sectionS, sectionE);
    const fetchSeats = async(e) =>{
      try{
        const res = await API.get(`/seats/${turn_No}/${tClass}`)
      }
      catch(err){
        console.log(err);
      }

    }

    const handleSelectSeat = (seatNo) => {
  if (bookedSeats.includes(seatNo)) return;

  if (selected.includes(seatNo)) {
    setSelected(selected.filter(s => s !== seatNo));
    console.log(selected);
  } else {
    setSelected([...selected, seatNo]);
  }
};

  const handleConfirmSeats = () =>{
    if(selected.length > 5 || selected.length === 0 ){
      return alert("Please select between 1 to 5 seats.");
    }
    navigate('/confirm', {state: {selectedSeats: selected, turn_No, tClass, compartment, travel_Date, sectionS, sectionE, from, to }});

  }

    useEffect(() => {
  const fetchBookedSeats = async () => {
    if (!turn_No || !tClass || !compartment || !travel_Date) return;

    try {
      const res = await API.get(`/booking/searchBookedSeats/${turn_No}/${tClass}/${compartment}/${travel_Date}/${sectionS}/${sectionE}`);
      const seatsB = res.data.data;
      console.log("Booked seats fetched successfully:", seatsB);
      setBookedSeats(seatsB); // store seat IDs only
    } catch (err) {
      console.log(err);
    }
  };

  fetchBookedSeats();
}, [turn_No, tClass, compartment, travel_Date, sectionS, sectionE]);
    
  return (
    <>
    <div className='gap-4 p-4 bg-gray-200 rounded-lg m-10' >
        <div className='grid' style={{gridTemplateColumns: `repeat(${cols}, minmax(2rem, 1fr))`} }> 
            {
            seats.map((seat)=>(
                <Seat key={seat.seat_No} seat={seat} bookedSeats={bookedSeats} selectedSeats={selected} onClick={() => handleSelectSeat(seat.seat_No)}/>
            ))
        }
        </div>
        
        
        
    </div>
    <div className='text-center text-lg font-bold'>Selected Seats: {selected.join(', ')}</div>
    <div className='align-middle justify-center flex '>
      <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={handleConfirmSeats}>Confirm Seats</button>
    </div>
    </>
  )
}

export default FirstClass