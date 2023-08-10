import userModel from '../models/authModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { userValidationSchema } from '../validators/Validation.js'

export const createUser = async (req, res) => {
    try {
        const {error,value} = userValidationSchema.validate(req.body)

        if(error) {
            return res.status(400).send({
                success:false,
                error:error.message
            })
        }


        const existingUser = await userModel.findOne({email:value.email})
        if(existingUser) return res.status(400).send({
            success:false,
            message:'This Email Already Register'
        })

        // ----------------Hash Password--------------
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(value.password,salt)

        
        const newUser = new userModel({name:value.name ,email:value.email ,password:hashpassword})
        const savedUser = await newUser.save()
        

        res.status(201).send({
            success: true,
            savedUser,
            message:'User registered Successfully',
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            error: error
        })
    }
}

export const getAllUsers = async (req,res) =>{
    try {
        const users = await userModel.find()
        res.status(200).send({
            success:true,
            users
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error
        })
    }
    
}

export const getUserById = async (req,res) =>{
    try {
        const id = req.params.id
        const user = await userModel.findById(id)
        if (!user) return res.status(404).send({
            success:false,
            message:'User Not Found'
        })
        
        res.status(200).send({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error
        })
    }
    
}


export const login = async (req, res) => {
    try {
        const {password,email} = req.body

        if (!password || !email) {
            return res.status(400).send({
                success:false,
                error:'All Felids are required'
            })}
        
        
        const existingUser = await userModel.findOne({email})
        if(!existingUser) return res.status(400).send({
            success:false,
            message:'This User does not exist'
        })

        const comparepassword = await bcrypt.compare(password,existingUser.password)
        if(!comparepassword) return res.status(400).send({
            success:false,
            message:'Invalid Credentials'
        })
        
        
        const JWT_TOKEN = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET,{
            expiresIn:'30d'
        })

        delete existingUser.password 
        res.status(201).cookie('token',JWT_TOKEN).send({
            success: true,
            existingUser,
            message:'User Login Successfully',
            token:JWT_TOKEN
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error
        })
    }
}




