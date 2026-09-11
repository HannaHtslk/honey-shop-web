const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { sendOrderNotification } = require('../utils/telegram');

router.post('/', async (req, res) => {
    try {
        if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
            return res.status(400).json({ message: 'Замовлення повинно містити хоча б один товар' });
        }

        const calculatedTotal = req.body.items.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );
        if (calculatedTotal !== req.body.totalPrice) {
            return res.status(400).json({
                message: `Невідповідність суми: очікувалось ${calculatedTotal}, отримано ${req.body.totalPrice}`
            });
        }

        const order = await Order.create(req.body);
        sendOrderNotification(order).catch((err) => console.error('Notification failed:', err));
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;