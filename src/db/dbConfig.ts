import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!); // this is ! for type saftey
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongodb connected");
    });
    connection.on("error", (err) => {
        
      console.log("mongodb connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong in connecting to mongoDb");
    console.log(error);
  }
};
