import mongoose from "mongoose";

export const mongodbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb://msr:Mshafqat@ac-7w5eadz-shard-00-00.xss0zur.mongodb.net:27017,ac-7w5eadz-shard-00-01.xss0zur.mongodb.net:27017,ac-7w5eadz-shard-00-02.xss0zur.mongodb.net:27017/?ssl=true&replicaSet=atlas-si6d32-shard-0&authSource=admin&retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Connected to Database Successfully on Mongo DB Atlas`);
  } catch (error) {
    console.log("Error while connecting to Database");
  }
};
