import express from 'express';
import Lead from '../models/Lead.js';
import { sendLeadNotification } from '../utils/telegram.js';
import { normalizePhone } from '../utils/phone.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const priorCount = await Lead.countDocuments({ phone: normalizePhone(req.body.phone) });
        const lead = await Lead.create(req.body);
        sendLeadNotification(lead, priorCount).catch((err) => console.error('Notification failed:', err));
        res.status(201).json(lead);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

export default router;