import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        unique:true,
        type:String,
        required:true,
        

    },
    password:{
        type:String,
        required:true
    }
    

},
{timestamps:true}
)

export default mongoose.model('User',userSchema)