import jwt from "jsonwebtoken";
import userModel from '../models/authModel.js'
import mongoose from "mongoose";


export const authtoken = async (req, res, next) => {
    try {
        let token;
        if (req.headers['authorization']) {
            token = req.headers['authorization'].split(' ')[1];
            // verify
            jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {

                if (error) return res.status(400).send({
                    success: 'false',
                    message: 'Auth Failed'
                })
                else {
                    req.body.userId = decode.userId
                    next()
                }
            })

        } else if (req.query.api_key) {
            token = req.query.api_key;

            if (!mongoose.Types.ObjectId.isValid(token)) return res.status(400).send({
                success: false,
                message: 'Auth Failed'
            })

            const user = await userModel.findById(token)
            if (!user) return res.status(400).send({
                success: false,
                message: 'Auth Failed'
            })
            else {
                req.body.userId = user._id
                next()
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Missing Token',
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
