import 'dotenv/config';
import TrainList from '../models/trainList.js';
import Stations from '../models/stoppingStations.js';
import FaresMatrix from '../models/fares.js';

const addTrain = async (req,res) => {
    const {
        line ,
        turn_No,
        name,
        from,
        to,
        departure
    } = req.body;
    try{
        const exitingTurn = await TrainList.findOne({turn_No})
        if(exitingTurn){
            return res.status(400).json({message: "Turn No already exists"})
        }
        const newTurn = new TrainList ({line,turn_No, name, from, to, departure});
        await newTurn.save();
        res.status(200).json({message: "Turn added successfully!"});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};
const updateTrain = async(req,res) =>{
    const {
        line ,
        turn_No,
        name,
        from,
        to,
        departure
    } = req.body;
    
    try{
        const updateTrainList = await TrainList.findOneAndUpdate(
            {line: line, turn_No: turn_No},
            {$set: {line:line , turn_No:turn_No, name:name, from:from, to:to, departure:departure}},
            {new:true}
        )
        if(!updateTrainList){
            return res.status(400).json({message:"Can't Update!"})

        }
        res.status(200).json({message: 'Update Successful'});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

const addStation = async (req,res)=>{
    const {
        turn_No,
        sName,
        sArrival,
        sDeparture
    } = req.body;
    try{
        const exitingStation = await Stations.findOne({turn_No ,sName});
        if(exitingStation){
            return res.status(400).json({message: 'There is Filed here for this'});
        }

        const newStation = new Stations({turn_No,sName,sArrival,sDeparture});
        await newStation.save();
        res.status(200).json({message:"Station added successfully!"});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }

 }
 const updateStation = async(req, res)=>{
    const {
        turn_No,
        sName,
        sArrival,
        sDeparture
    } = req.body;
    try{
        const updateStationData = await Stations.findOneAndUpdate(
            {turn_No: turn_No, sName: sName},
            {$set:{turn_No:turn_No, sName:sName, sArrival:sArrival, sDeparture:sDeparture}},
            {new:true}
        )
        if(!updateStationData){
            return res.status(400).json({message:"Can't Update"});
        }
        res.status(200).json({message:"Station update successful!"}); 
        

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
 }

 const addFares = async (req,res)=>{
    const {turn_No,
        tClass,
        matrix
    } = req.body;
    try{
        if(!matrix || matrix.length ===0){
            return res.status(400).json({message: "Matrix is required"});
        }
        const exitingMatrix = FaresMatrix.findOne({turn_No,tClass});
        if(exitingMatrix.length===0){
            return res.status(400).json({message:"Fares already Added!"})
        }
        const fares ={};
        const columnStations = matrix[0].slice(1);
        const rowStations = matrix.slice(1).map(row=>row[0]);

        matrix.slice(1).forEach((row,rowIndex)=>{
            const fromStation = rowStations[rowIndex];
            fares[fromStation]={};

            row.slice(1).forEach((value,colIndex)=>{
                const toStation = columnStations[colIndex];
                fares[fromStation][toStation]=Number(value) || 0;
            });
        });

        const addMatrix = await FaresMatrix.create({turn_No,tClass, fares});
        if(!addMatrix) return res.status(400).json({message:"Please try again!"});
        res.status(200).json({message: "Fares added successfully!"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
 }

  const updateFares = async (req,res)=>{
    const {turn_No,
        tClass,
        matrix
    } = req.body;
    try{
        if(!matrix || matrix.length ===0){
            return res.status(400).json({message: "Matrix is required"});
        }
        const fares ={};
        const columnStations = matrix[0].slice(1);
        const rowStations = matrix.slice(1).map(row=>row[0]);

        matrix.slice(1).forEach((row,rowIndex)=>{
            const fromStation = rowStations[rowIndex];
            fares[fromStation]={};

            row.slice(1).forEach((value,colIndex)=>{
                const toStation = columnStations[colIndex];
                fares[fromStation][toStation]=Number(value) || 0;
            });
        });

        const updateMatrix = await FaresMatrix.findOneAndUpdate({turn_No:turn_No,tClass :tClass},
            {$set:{turn_No: turn_No, tClass: tClass, fares:fares}},
            {new:true}
        );
        if(!updateMatrix) return res.status(400).json({message: "Please try again!"});
        res.status(200).json({message: "Fares update successfully!"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
 }
export  {addTrain, addStation, updateTrain, updateStation, addFares, updateFares};