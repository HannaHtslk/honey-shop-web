import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

router.get("/",  async (req, res) => {
    try{
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post("/", async (req, res) => {
    try{
        const posts = await Post.create(req.body);
        res.status(201).json(posts);
    } catch(error){
        res.status(400).json({ message: error.message });
    }

})

export default router;