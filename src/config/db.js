import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://sirdavidudoji07:sirdavidudoji07@cluster0.e7mrhve.mongodb.net/gospelspreadmap?retryWrites=true&w=majority');
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}; 