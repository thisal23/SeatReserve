import React from 'react'
import { useState, useEffect , useRef} from 'react';
import API from '../../api/api';
import { useLocation } from 'react-router-dom';
import { use } from 'react';

function Seat({ seat, bookedSeats = [], selectedSeats = [], onClick }) {

  let seatStyle =
    "w-10 h-10 border m-1 flex items-center justify-center cursor-pointer ";

const isBooked = bookedSeats.some(
  bSeat => bSeat.seat_No === seat.seat_No
);
  const isSelected = selectedSeats.includes(seat.seat_No);

  if (isBooked) seatStyle += "bg-red-500 cursor-not-allowed ";
  else if (isSelected) seatStyle += "bg-green-500 ";
  else seatStyle += "bg-blue-700 hover:bg-green-600 ";

  return (
    <div className={seatStyle} onClick={isBooked ? null : onClick}>
      <div className="text-xs text-white text-center">
        {seat.seat_No}
        <span className="text-[10px]">{seat.type}</span>
      </div>
    </div>
  );
}


export default Seat