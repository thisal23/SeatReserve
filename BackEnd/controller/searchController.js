import Stations from "../models/stoppingStations.js";

const stationList = async (req,res)=>{
    const {turn_No} = req.params;
    try{
        const list = await Stations.find({turn_No}).sort({sDeparture:1});
        if(!list || list.length === 0 ){
            return res.status(400).json({message:"Can't find Stations!"});
        }
        res.status(200).json({message:"Station list Fetched..." , data:list});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

export default stationList;