import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import FirstClass from '../../Components/SeatLayout/FirstClass'

function Class() {
  return (
    <>
    <div>
        <NavBar/>
    </div>
    <div className='mt-40'>
        <FirstClass/>
        <div>
          <div>
            <h4> </h4>
          </div>
        </div>
    </div>
    </>
  )
}

export default Class