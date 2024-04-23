const express = require('express');
const connectDB = require('./config/db');
const categoryRoutes = require('./route/categoryRoutes');
const updateRoutes=require('./route/updateRoutes');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/category', categoryRoutes);
app.use('/update', updateRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
 