const mongoose = require('mongoose');
const connectDB = async () => {
  let retries = 5;
  while (retries) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {});
      console.log('MongoDB connected');
      break;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      retries--;
      if (!retries) process.exit(1);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};
module.exports = connectDB;