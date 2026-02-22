import React from 'react'
import NavBar from '../NavBar/NavBar'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import API from '../../api/api';

function BookingConfirmation() {

    const location = useLocation();
    const selectedSeats = location.state?.selectedSeats || [];
    const turn_No = location.state?.turn_No;
    const tClass = location.state?.tClass;
    const compartment = location.state?.compartment;
    const travel_Date = location.state?.travel_Date;
    const sectionS = location.state?.sectionS;
    const sectionE = location.state?.sectionE;
    const from = location.state?.from;
    const to = location.state?.to;
    const [totalFare, setTotalFare] = useState(0);
    const [loading, setLoading] = useState(false);

    const handlePlaceBooking = async() => {
        try{
            setLoading(true);
            if(selectedSeats.length === 0){
                alert("No seats selected!");
                return;
            }
            const pricePerSeat = totalFare/selectedSeats.length;

            
                const res = await API.post('/booking/addBooking', {
                seats:selectedSeats,
                turn_No,
                tClass,
                compartment,
                travel_Date,
                from,
                to,
                sectionS,
                sectionE,
                price: pricePerSeat 
            })
            console.log(res.data);
            alert("Booking placed successfully!");
            setLoading(false);
        }
            
            
    
        catch(err){
            console.log(err);
            alert("Failed to place booking. Please try again.");
            setLoading(false);
        }
    }

    const fetchFares = async() => {
        try{
            const res = await API.get(`/fare/${turn_No}/${tClass}/${sectionS}/${sectionE}`);
            console.log(res.data);
            if(!res.data || res.data.price === undefined) return alert("Fare information not available.");
            const fare = res.data.price;
            const intFare = parseInt(fare, 10);
            const seatsCount = selectedSeats.length;
            setTotalFare(intFare * seatsCount);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchFares();
    },[tClass, sectionS, sectionE])

  return (
    <>
        <NavBar/>
        <div className='mt-30'>
        <h1 className='text-2xl font-bold text-center mt-10 text-green-600'>Booking Confirmation</h1>
        <p className='text-center mt-4' >Selected Seats: {selectedSeats.join(', ')}</p>
        <p className='text-center mt-2' >Turn No: {turn_No}</p>
        <p className='text-center mt-2' >Class: {tClass}</p>
        <p className='text-center mt-2' >Compartment: {compartment}</p>
        <p className='text-center mt-2' >Travel Date: {travel_Date}</p>
        <p className='text-center mt-2' >From: {from}</p>
        <p className='text-center mt-2' >To: {to}</p>
        <p className='text-center mt-2' >Total : {totalFare}</p>

        <button disabled={loading} className='block mx-auto mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600' onClick={handlePlaceBooking}>{loading ? "Processing..." : "Place Booking"}</button>
        </div>
    </>
  )
}

export default BookingConfirmation