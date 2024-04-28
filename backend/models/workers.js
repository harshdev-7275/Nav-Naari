import mongoose from 'mongoose';


const workerSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    image:{
        type:String,
        trim:true
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: ['JP Nagar', 'Banshankari', 'RR Nagar']
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    profession: {
        type: String,
        required: true,
        enum: ['cooking', 'arts', 'health', 'education', 'lifestyle', 'consultation', 'parenting', 'fashion']
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
});



const Worker = mongoose.model("Worker", workerSchema);

export default Worker;
