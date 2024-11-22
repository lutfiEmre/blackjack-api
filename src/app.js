const express = require('express');
const connectDB = require('../config/db');
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
connectDB();
app.use(express.json());

app.use('/api/game', gameRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
