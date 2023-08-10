import productModel from '../models/productModel.js'

export const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        let limit = Math.min(parseInt(req.query.limit) || 15, 15)

        const sortField = req.query.sort ? req.query.sort.split('.')[0] : 'title';
        const sortOrder = req.query.sort ? req.query.sort.split('.')[1] : 'asc';

        const skip = (page - 1) * limit;

        

        const count = await productModel.countDocuments();
        const TotalPages =Math.ceil(count / limit)
        if(page > TotalPages){
            return res.status(400).send({
                success:false,
                TotalPages,
                CurrentPage:page,
                message:`Current Page exceeds the Total Pages`
            })
        }

        // Query the database 
        const products = await productModel.find()
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);

        res.status(200).send({
            success: true,
            currentPage: page,
            limit: limit,
            totalPages: Math.ceil(count / limit),
            totalProducts: count,
            products,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        })
    }

}

export const getProductById = async (req, res) => {

}

export const createProduct = async (req, res) => {
    try {
        const { title, price, description, category, image } = req.body;
        // Validate input data
        if (!title || !price || !description || !category || !image) {
            return res.status(400).json({ error: 'All fields are required.' });
        }


        const newProduct = new productModel({
            title,
            price,
            description,
            category,
            image,
        });
        const savedProduct = await newProduct.save();

        res.status(201).send({ success: false, response: savedProduct, message: 'Product Created Successfully' });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
}


