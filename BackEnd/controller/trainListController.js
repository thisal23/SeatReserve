import express from 'express'
import trainList from '../models/trainList.js'

const getTrainlist = async (req,res) =>{
    const {line} = req.body;
    try{
        const list = await trainList.find({line});
        if(!list){
            return res.status(400).json({message: "No Data to show!"});
        }
        res.status(201).json({message: "Train list fetched" , data: list});
    }
    catch (err){
        res.status(500).json({message: err.message});
    }

}

export default getTrainlist;