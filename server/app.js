const express = require('express');
const connectDB = require('./config/db');
const categoryRoutes = require('./route/categoryRoutes');
const updateRoutes=require('./route/updateRoutes');
const integrateAmazonRoutes=require('./route/integrateAmazonRoutes')
const app = express();
const PORT = process.env.PORT || 3001;
const cron = require('node-cron');
const scheduleTimeOneHr='0 * * * *';
const scheduleTimeEightHr='0 */8 * * *';
const scheduleTimeTest='*/10 * * * *';
const UpdateController = require('./controllers/updateController');
const cors = require('cors');

app.use(cors());
// Middleware
app.use(express.json());

connectDB();

app.use('/category', categoryRoutes);
app.use('/update', updateRoutes);
app.use('/integrateAmazon',integrateAmazonRoutes)
  cron.schedule(scheduleTimeEightHr, () => {
    console.log('Running updateDb job...');
    UpdateController.updateDbForCategory();
    console.log('Done running updateDb job');
  });

  
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
 