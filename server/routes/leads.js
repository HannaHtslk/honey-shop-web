const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { sendLeadNotification } = require('../utils/telegram');

router.post('/', async (req, res) => {
    try {
        const lead = await Lead.create(req.body);
        sendLeadNotification(lead); 
        res.status(201).json(lead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;