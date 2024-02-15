import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config";
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"


mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));  
app.use(cors());

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.listen(process.env.PORT||5000, ()=>{
    console.log(`Server is running ${process.env.PORT}`);
})
