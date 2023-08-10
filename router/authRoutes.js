import express from "express";
import { createUser, getAllUsers, getUserById, login } from "../controllers/authController.js";


const router = express.Router()



router.post('/register',createUser)
router.post('/login',login)



router.get('/users',getAllUsers)
router.get('/users/:id',getUserById)


export default router