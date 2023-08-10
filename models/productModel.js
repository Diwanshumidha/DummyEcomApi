import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
        title: {
            type:String,
            required:[true,'Title is Required']
        },
        price: {
            type:Number,
            required:[true,'Price is Required']
        },
        description: {
            type:String,
            required:[true,'Description is Required']
        },
        category: {
            type:String,
            enum:['fashion','electronics','jewelery']
        },
        image: {
            type:String,
            required:[true,'Title is Required']
        },
},{timestamps:true})


export default mongoose.model('products',productSchema)