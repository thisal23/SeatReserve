import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../api/api';
import DataTable from "datatables.net-react";
import DT from 'datatables.net-dt';
import "datatables.net-dt/css/dataTables.dataTables.css";

DataTable.use(DT);

function TrainList() {

  const {line} = useParams();
  const [lineName, setLineName] = useState("");
  const [trains, setTrains] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
  switch(line){
    case "1":
      setLineName("Coastal Line");
      break;
    case "2":
      setLineName("Main Line");
      break;
    case "3":
      setLineName("Nothern Line");
      break;
    case "4":
      setLineName("Eastern Line");
      break;
    default:
      setLineName("Unknown Line");
      break;
  }

  handleList(line);
  }, [line])

  const handleList = async ()=>{
    try{
      const res = await API.post(`/trainlist`,{line});
      const data = res.data.data;
      setTrains(data);
      console.log("Train list fetched successfully!");
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <>
    <div>
      <NavBar/>
    </div>
    <div className='flex flex-col items-left justify-center mt-24 ml-6'>
      <h3 className='text-2xl font-bold '>{lineName} booking Trains</h3>
      <DataTable className='w-full  text-center border-green-950 shadow-md [&>thead>tr>th]:bg-green-700 [&>tbody>tr]:bg-green-50 [&>tbody>tr]:text-black [&>tbody>tr:hover]:bg-slate-100 '
        data={trains.map(turn=>[
          turn.turn_No,
          turn.name,
          turn.from,
          turn.to,
          turn.departure
      ])}

      columns={[
        {title: 'Turn No'},
        {title: 'Name'},
        {title: 'From'},
        {title: 'To'},
        {title: 'Departure'},
        

      ]}
      options={{
        search: true,
        paging: true,
        ordering: true,
        order: [[4,'asc']],
        createdRow: (row, rowData)=>{
          row.addEventListener('click', ()=> {
            const turn_No = rowData[0] ;
            navigate(`/search/${turn_No}`,{state:{turn_No}});
          });
          row.style.cursor= 'pointer';
        }  
      }}
      highlightOnHover
      striped
      pointerOnHover

      

      />

    </div>
    </>
  )
}

export default TrainList