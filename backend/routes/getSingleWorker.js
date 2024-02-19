import express from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import Worker from "../models/workers.js";

const router = express.Router();

router.get('/getSingleWorker',async (req, res)=>{
    
    try {
        const id = req.query.id;
        console.log(id);
        if(!id){
            return res.status(404).json({
                message:"Please provide a worker id"
            })
        }

        const worker = await Worker.findById(id);
        console.log(worker);
        res.status(200).json(worker);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message:"Worker not found"
        });
    }
})

export default router;