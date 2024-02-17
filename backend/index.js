import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config";
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import workerRoutes from "./routes/worker.js"
import getAllWorkers from "./routes/getAllWorkers.js"
import getSingleWorker from "./routes/getSingleWorker.js"


mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));  
app.use(cors());

app.use("/api/users", userRoutes)
app.use("/api/workers/get", getAllWorkers)
app.use("/api/workers/getSingle", getSingleWorker)
app.use("/api/workers", workerRoutes)
app.use("/api/auth", authRoutes)

app.listen(process.env.PORT||5000, ()=>{
    console.log(`Server is running ${process.env.PORT}`);
})
