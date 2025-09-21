import React from 'react'

export function genarateSeats(rows, cols,prefix) {
    const seats = [];
    let count=0;

    for(let i=0; i<rows; i++){
        for(let j=0; j<=cols; j++){
            let seatType = "A";
            count++;
            if(j===0 || j===cols-1) seatType = "W";
            else if(cols>2 && (j===1 || j===cols-2)) seatType = "A";

            seats.push({
                id:`${prefix}-${count}`,
                row: i+1,
                col: j+1,
                type: seatType,
            });
        }
    }
  return seats;
}

