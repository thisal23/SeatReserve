import React from 'react'

function Seat({seat, status, onClick}) {
  let seatStyle = "w-10 h-10 border m-1 flex items-center justify-center cursor-pointer";

  if(status === 'available') seatStyle += "bg-green-500 hover:bg-green-600";
  if(status === 'booked') seatStyle += "bg-red-500 cursor-not-allowed";
  if(status === 'selected') seatStyle += "bg-blue-500";
  return (
    <>
      <div className={seatStyle} onClick={status !== "booked" ? onClick : null}>
        <div className='text-xs text-white text-center'>
          {seat.id}
          <span className='text-[10px]'>{seat.type}</span>


        </div>
      </div>
    </>
  )
}

export default Seat