import React, { useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import API from '../../api/api';

function Manage() {
    const [line, setLine] = useState("");
    const [turn_No, setTurn_No] = useState("");
    const [name, setName] = useState("");
    const [from , setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departure ,setDeparture] = useState("");

    const handleAddTrain = async (e) =>{
        e.preventDefault();

        try{
            const res = await API.post("/manage/train" ,{ line,turn_No,name, from, to, departure});
            console.log(res.data);
            alert('Train added successfully!');

        }
        catch (err){
            console.log(err);
            alert('Please try again!');
        }
    }
  return (
    <>
        <div>
            <NavBar/>
        </div>
        <div className='flex md:flex-row flex-col justify-center p-8 mt-20 w-auto'>
            <div className='flex flex-col bg-white text-black justify-center text-center rounded-lg border border-green-800'>
                <h4>Update Trains</h4>
                <h6>Add Train</h6>
                <form className='flex flex-col text-left p-6 gap-2' onSubmit={handleAddTrain}>
                    <label>Line :</label>
                    <input type="text" placeholder='Enter Line' value={line} onChange={(e)=> setLine(e.target.value)}/>
                    <label>Turn No :</label>
                    <input type="text" placeholder='Enter Turn No' value={turn_No} onChange={(e)=> setTurn_No(e.target.value)}/>
                    <label>Name :</label>
                    <input type="text" placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value)}/>
                    <label>From :</label>
                    <input type="text" placeholder='Enter Starting Station' value={from} onChange={(e)=> setFrom(e.target.value)}/>
                    <label>To :</label>
                    <input type="text" placeholder='Enter Destination' value={to} onChange={(e)=> setTo(e.target.value)}/>
                    <label>Departure :</label>
                    <input type="text" placeholder='Enter Departure Time' value={departure} onChange={(e)=> setDeparture(e.target.value)}/>
                    <button className="bg-primary text-white rounded-lg py-2 mt-3 justify-center" type='submit'>Add</button>
                </form>
            </div>
        </div>

    </>
  )
}

export default Manage