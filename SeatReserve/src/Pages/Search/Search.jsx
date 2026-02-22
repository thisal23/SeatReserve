import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import { useNavigate, useLocation} from 'react-router-dom'
import API from '../../api/api';
import DataTable from "datatables.net-react";
import DT from 'datatables.net-dt';
import "datatables.net-dt/css/dataTables.dataTables.css";

DataTable.use(DT);

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stationList , setStationList] = useState([]);
  const turn_No = location.state?.turn_No ;
  const [from, setStart]= useState("");
  const [to, setEnd] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate]= useState(today);
  
  const [available, setAvailable]= useState([]);
  const [sectionS, setSectionS] = useState("");
  const [sectionE, setSectionE] = useState("");
  
  const handleSearch = async(e)=>{
    e.preventDefault();
    try{
      console.log(turn_No,date,from, to);
      const res = await API.get(`/booking/searchBooking/${turn_No}/${date}/${from}/${to}`);
      const data= res.data.data;
      setAvailable(data);

      // const sectionS = data[0].sectionS;
      // const sectionE = data[0].sectionE;
      setSectionS(data[0].sectionS);
      setSectionE(data[0].sectionE);
      console.log(sectionS, sectionE);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    const handleList = async ()=>{
      try{
        const res = await  API.get(`/search/list/${turn_No}`);
        const list = res.data.data;
        setStationList(list);
        console.log("Stations fetched successfully!");
      }
      catch(err){
        console.log(err);
      }
    }

    handleList();
  },[turn_No])
  return (
    <>
    <div>
      <NavBar/>
    </div>
    { available==0 && 
    <div className='mt-40 md:mt-40  flex flex-col items-center justify-center  px-6 md:px-16 lg:px-36 gap-4 '>
      <div className='flex flex-col text-2xl gap-4 md:w-2xl bg-white rounded-lg p-6'>
        <h3 className='font-bold text-black underline' >Search Seats</h3>
      
        <form className='flex flex-col'>
          <label className='text-black'>From :</label>
          <select onChange={(e)=>setStart(e.target.value)} className='text-black bg-secondary rounded-lg'>
          {stationList.map((station,i)=>(
            <option key={i} value={station.sName}>{station.sName}</option>
         
         ))}
          
        </select>
        <label className='text-black'>To :</label>
        <select onChange={(e)=>setEnd(e.target.value)}  className='text-black bg-secondary rounded-lg'>
          {stationList.map((station,i)=>(
            <option key={i} value={station.sName}>{station.sName}</option>
         
         ))}
          
        </select>
        <label className='text-black'>Date :</label>
        <input type='date' className='text-black font-thin bg-secondary rounded-lg' value={date} onChange={(e)=> setDate(e.target.value)}/>
        {/* <label className='text-black'>No of Passengers :</label> */}
        {/* <input type="number" className='text-black font-thin bg-secondary rounded-lg' value={passengers} onChange={(e)=>setPassengers(e.target.value)} /> */}
        <button type='button' className='cursor-pointer bg-primary px-4 py-2 rounded-lg text-white mt-6' onClick={handleSearch}>Search</button>
        </form>
      </div>
      </div>}
      <div>
        {available && available.length>0 &&
        <div className='mt-40'>
        <DataTable className='w-full  text-center border-green-950 shadow-md [&>thead>tr>th]:bg-green-700 [&>tbody>tr]:bg-green-50 [&>tbody>tr]:text-black [&>tbody>tr:hover]:bg-slate-100 '
        data={available.map(turn=>[
          turn.turn_No,
          turn.tClass,
          turn.compartment,
          turn.travel_Date.split('T')[0],
          turn.remaining,
      ])}

      columns={[
        {title: 'Turn No'},
        {title: 'Class'},
        {title: 'Compartment'},
        {title: 'Date'},
        {title: 'Remaining Seats'}
        

      ]}
      options={{
        search: true,
        paging: true,
        ordering: true,
        order: [[4,'asc']],
        createdRow: (row, rowData)=>{
          row.addEventListener('click', ()=> {
            const turn_No = rowData[0] ;
            navigate(`/class`,{state:{turn_No ,tClass: rowData[1], compartment: rowData[2], travel_Date: rowData[3], sectionS:sectionS , sectionE: sectionE, from:from,to:to}});
          });
          row.style.cursor= 'pointer';
        }  
      }}
      highlightOnHover
      striped
      pointerOnHover

      

      />
      </div> }
      </div>
    </>
  )
}

export default Search;