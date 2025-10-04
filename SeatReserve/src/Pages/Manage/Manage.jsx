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
    const [sName, setSName] = useState("");
    const [sArrival, setSArrival] = useState("");
    const [sDeparture, setSDeparture] = useState("");
    const [tClass, setTClass] = useState("");
    const [rows, setRows]= useState(0);
    const [cols , setCols]= useState(0);
    const [matrix, setMatrix]= useState([]);
    const [generated, setGenerated] = useState(false);

    const generateTable = () =>{
        const newMatrix = Array.from({length:rows+1},(_, rowIndex)=> 
        Array.from({length:cols+1},(_, colIndex)=>{
            if(rowIndex===0 && colIndex===0) return "From / To";
            return "";
        })
        );
        setMatrix(newMatrix);
        setGenerated(true);
    }

    const handleInputChange =  (rowIndex, colIndex,value)=>{
        const updatedMatrix = [...matrix];
        updatedMatrix[rowIndex][colIndex]= value;
        setMatrix(updatedMatrix);
        console.log(matrix);
    };

    const handleSubmitMatrix = async()=>{
        try{
            const res= await API.post("/manage/fares",{ turn_No,tClass,matrix});
            alert("Fare Matrix saved successfully!");
        }catch(err){
            console.log(err);
            alert("Please try again!");
        }
    };

    const handleUpdateFares = async()=>{
        try{
            const res = await API.post("/manage/updateFares", {turn_No,tClass, matrix});
            alert("Fare Matrix updated successfully!");
        }catch(err){
            console.log(err);
            alert("Please try again!");
        }    
    };

    const handleStation = async (e) =>{
        e.preventDefault();
        try{
            const res= await API.post("/manage/stations", {turn_No,sName,sArrival,sDeparture});
            alert('Station added successfully!');
        }
        catch(err){
            console.log(err);
            alert("Please try again!");
        }
    };
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
    };

    const handleUpdateTrain = async ()=>{
        try{
            const res = await API.post("/manage/updateTrain", {line,turn_No, name, from, to, departure});
            alert("Train updated successfully!");
        }
        catch(err){
            console.log(err);
            alert('Update Unsuccessful! Please try again...');
        }
    };

    const handleUpdateStation = async ()=>{
        try{
            const res = await API.post("/manage/updateStation", {turn_No,sName,sArrival, sDeparture});
            alert("Station Updated successfully");
        }
        catch(err){
            console.log(err);
            alert('Update Unsuccessful! Please try again...')
        }
    };
    const handleResetStation = () =>{
        setTurn_No("");
        setSName("");
        setSArrival("");
        setSDeparture("");
    };

    const handleResetTurn = () =>{
        setLine("");
        setTurn_No("");
        setName("");
        setFrom("");
        setTo("");
        setDeparture("");
    };
    const handleResetFares = ()=>{
        setTurn_No("");
        setTClass("");
        setCols("");
        setRows("");
        setGenerated(false);
    };

  return (
    <>
        <div>
            <NavBar/>
        </div>
        <div className='flex md:flex-row gap-3 flex-col justify-center p-8 mt-20 w-auto'>
            <div className='flex flex-col bg-white text-black justify-center text-center rounded-lg border border-green-800'>
                <h4>Update Trains</h4>
                <h6>Add Train</h6>
                <form className='flex flex-col text-left p-6 gap-2' >
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
                    <button className="bg-primary hover:bg-green-500 text-white rounded-lg py-2 mt-3 justify-center" type='submit' onClick={handleAddTrain}>Add</button>
                    <button className="bg-red-600 hover:bg-red-500 text-white rounded-lg py-2 mt-3 justify-center" type="reset" onClick={handleResetTurn}>Reset</button>
                    <button className="bg-orange-500 hover:bg-orange-400 text-white rounded-lg py-2 mt-3 justify-center" type='button' onClick={handleUpdateTrain}>Update</button>
                </form>
            </div>
            <div className='flex flex-col bg-white text-black justify-center text-center rounded-lg border border-green-800'>
                <h6>Add Stations</h6>
                <form  className='flex flex-col text-left p-6 gap-2'>
                    <label>Turn No :</label>
                    <input type="text" placeholder='Enter Turn No' value={turn_No} onChange={(e)=> setTurn_No(e.target.value)}/>
                    <label>Station :</label>
                    <input type='text' placeholder='Station Name' value={sName} onChange={(e)=> setSName(e.target.value)}/>
                    <label>Arrival :</label>
                    <input type='text' placeholder='Arrival Time' value={sArrival} onChange={(e)=>setSArrival(e.target.value)}/>
                    <label>Departure :</label>
                    <input type='text' placeholder='Departure Time' value={sDeparture} onChange={(e)=> setSDeparture(e.target.value)}/> 
                    <button className="bg-primary hover:bg-green-500 text-white rounded-lg py-2 mt-3 justify-center" type='submit' onClick={handleStation}>Add</button>
                    <button className="bg-red-600 hover:bg-red-500 text-white rounded-lg py-2 mt-3 justify-center" type="reset" onClick={handleResetStation}>Reset</button>
                    <button className="bg-orange-500 hover:bg-orange-400 text-white rounded-lg py-2 mt-3 justify-center" type='button' onClick={handleUpdateStation}>Update</button>

                </form>
            </div>
            
        </div>
        <div className='flex flex-row w-auto justify-center'>
            <div className='flex flex-col bg-white text-black justify-center text-center rounded-lg border border-green-800'>
                <h6>Add / Update fares</h6>
                <form  className='flex flex-col text-left p-6 gap-2'>
                    <label>Turn No :</label>
                    <input type="text" placeholder='Enter Turn No' value={turn_No} onChange={(e)=> setTurn_No(e.target.value)}/>
                    <label>Class :</label>
                    <input type='text' placeholder='Class Name' value={tClass} onChange={(e)=> setTClass(e.target.value)}/>
                    <label>Columns :</label>
                    <input type="number" placeholder='Enter Columns for Matrix' value={cols} onChange={(e)=> setCols(Number(e.target.value))}/>
                    <label>Rows :</label>
                    <input type="number" placeholder='Enter Rows for Matrix' value={rows} onChange={(e)=> setRows(Number(e.target.value))}/>
                    <button className="bg-amber-400 hover:bg-amber-300 text-white rounded-lg py-2 mt-3 justify-center" type='button'disabled={!rows|| !cols} onClick={generateTable}>Generate Table</button>

                    {generated && (
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        {matrix[0].map((cell, index)=>(
                                            <th key={index}>
                                                <input type="text" value={cell} onChange={(e)=> handleInputChange(0,index, e.target.value)} placeholder={index===0 ? "From / To" : "Station Name"} disabled={index===0} />
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {matrix.slice(1).map((row,rowIndex)=>(
                                        <tr key={rowIndex}>
                                            {row.map((cell, colIndex)=>(
                                                <td key={colIndex}>
                                                    <input type='text' value={cell} onChange={(e)=> handleInputChange(rowIndex +1, colIndex, e.target.value)} placeholder={colIndex===0 ? "Station Name" : "Fare"} />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <button className="bg-primary hover:bg-green-500 text-white rounded-lg py-2 mt-3 justify-center" type='button' onClick={handleSubmitMatrix}>Add</button>
                    <button className="bg-red-600 hover:bg-red-500 text-white rounded-lg py-2 mt-3 justify-center" type="reset" onClick={handleResetFares}>Reset</button>
                    <button className="bg-orange-500 hover:bg-orange-400 text-white rounded-lg py-2 mt-3 justify-center" type='button' onClick={handleUpdateFares}>Update</button>

                </form>
            </div>
        </div>

    </>
  )
}

export default Manage