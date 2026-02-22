import FaresMatrix from "../models/fares.js";
import Stations from "../models/stoppingStations.js";

const calculateFares = async (req,res)=>{
    const {turn_No,
        tClass,
        sectionS,
        sectionE
    } = req.params;
    try{
        const stationList = await Stations.find({turn_No}).sort({order:1});
        const stations = stationList.map(s=> s.sName);

        const fromStationObj = stationList.find(s => s.sName === sectionS);
        const toStationObj = stationList.find(s => s.sName === sectionE);

        if (!fromStationObj || !toStationObj) {
            return res.status(400).json({ message: "Invalid Selection!" });
        }

        const start = fromStationObj.sectionS;
        const end = toStationObj.sectionE;

        const fareDoc = await FaresMatrix.findOne({turn_No,tClass});
        if(!fareDoc){
            return res.status(404).json({message:"Fare matrix not found"});
        }
        const fares= fareDoc.fares;

        

        
        console.log(start,end);
        let price = fares[start]?.[end];        
        if (!price && fares[end]?.[start]) {
            price = fares[end][start];
        }

        if (price === undefined) {
            return res.status(400).json({ message: "Fare not found for this route" });
        }

        res.status(200).json({message: "Success",price});

    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export default calculateFares;