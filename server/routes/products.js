import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get("/",  async (req, res) => {
    try{
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post("/", async (req, res) => {
    try {
        if (!Array.isArray(req.body.variants) || req.body.variants.length === 0) {
            return res.status(400).json({ message: 'Товар повинен мати хоча б один варіант об\'єму/ціни' });
        }
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

export default router;