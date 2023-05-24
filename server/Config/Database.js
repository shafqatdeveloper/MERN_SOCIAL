import mongoose from "mongoose";

export const mongodbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to Database Successfully on Mongo DB Atlas`);
  } catch (error) {
    console.log("Error while connecting to Database");
  }
};
