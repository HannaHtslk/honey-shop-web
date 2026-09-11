const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { sendLeadNotification } = require('../utils/telegram');
const { normalizePhone } = require('../utils/phone');

router.post('/', async (req, res) => {
    try {
        const priorCount = await Lead.countDocuments({ phone: normalizePhone(req.body.phone) });
        const lead = await Lead.create(req.body);
        sendLeadNotification(lead, priorCount);
        res.status(201).json(lead);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;