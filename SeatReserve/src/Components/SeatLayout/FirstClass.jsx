import React, { useState } from 'react'
import Seat from '../Seat/Seat'
import {genarateSeats} from '../../utils/genarateSeats'
function FirstClass({type, variant, rows, colss}) {
    const [selected, setSelected] = useState([]);
    // const seats = genarateSeats(rows, cols, type);
    const seats = genarateSeats(10, 4, 'A');
    const cols = 4;


    
  return (
    <>
    <div className='gap-4 p-4 bg-gray-200 rounded-lg m-10' >
        <div className='grid' style={{gridTemplateColumns: `repeat(${cols}, minmax(2rem, 1fr))`} }> 
            {
            seats.map((seat)=>(
                <Seat key={seat.id} seat={seat} status={selected.includes(seat.id) ? "selected": "available"}  />
            ))
        }
        </div>
        
        
        
    </div>
    </>
  )
}

export default FirstClass