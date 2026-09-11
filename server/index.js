require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const productsRouter = require('./routes/products');
const postsRouter = require('./routes/posts');
const leadsRouter = require('./routes/leads');
const orderRoutes = require('./routes/orders');


app.use('/api/products', productsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/orders', orderRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });