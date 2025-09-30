import 'dotenv/config';
import TrainList from '../models/trainList.js';

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
        res.status(201).json({message: "Turn added successfully!"});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

export default addTrain;