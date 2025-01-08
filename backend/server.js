require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db');
const initAdmin = require('./initAdmin'); 

const app = express();
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const projectRoutes = require('./src/routes/projectRoutes');

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối database
connectDB();
initAdmin();

// Routes
app.get('/', (req, res) => {
  res.send('DevOps Management Backend is running!');
});

app.use('/auth', authRoutes);
app.use('/admin', userRoutes);
app.use('/user', projectRoutes);

// Lắng nghe server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
