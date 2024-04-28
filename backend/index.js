import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config";
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import workerRoutes from "./routes/worker.js"
import getAllWorkers from "./routes/getAllWorkers.js"
import getSingleWorker from "./routes/getSingleWorker.js"
import messageRoute from "./routes/messageRoutes.js"


mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));  
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/users", userRoutes) //for user creation routes
app.use("/api/workers/get", getAllWorkers) // to view all worker
app.use("/api/workers/getSingle", getSingleWorker) // to view single worker
app.use("/api/workers", workerRoutes) //create worker schema
app.use("/api/auth", authRoutes) //for authentication
// app.use("/api/message",messageRoute)

app.listen(process.env.PORT||5000, ()=>{
    console.log(`Server is running ${process.env.PORT}`);
})
