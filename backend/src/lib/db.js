import mongoose from "mongoose";

const connectDB = async () => {
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_NAME = process.env.DB_NAME;

  const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.bovuhvd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
  }
};

export default connectDB;
