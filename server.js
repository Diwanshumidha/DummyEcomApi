import express from "express";
import colors from 'colors'
import env from 'dotenv'
import routes from "./router/authRoutes.js";
import products from './router/productRoute.js'
import connectdb from "./config/db.js";

const app = express()

env.config()
connectdb()

app.use(express.json());

app.get("/", (req,res)=>{
    res.send({
        connected:true
    })
})

app.use('/api/v1/auth', routes )

app.use('/api/v1/products', products)


const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(colors.bold.bgCyan(`Server is running on ${PORT}`))
    
})