import express from "express";
import { createProduct, getAllProducts } from "../controllers/productController.js";
import { authtoken } from "../middlewares/authMiddleware.js";


const router = express.Router()

router.get('/', authtoken, getAllProducts)
router.post('/',authtoken,createProduct)

export default router
