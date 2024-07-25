const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const propertyRoutes = require('./routes/propertyRoutes');

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', propertyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
