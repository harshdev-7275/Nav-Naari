import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    isAccept:{
        type: Boolean,
        default: false,
        required:true
    }
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
