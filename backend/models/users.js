import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isWorker: {
        type: Boolean,
        required: true,
        default: false
    },
    location: {
        type: String,
        enum: ['Banshankari', 'RR Nagar', 'JP Nagar'],
        required:true
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true
    },
    
});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();

});


const User = mongoose.model("User",userSchema);

export default User;