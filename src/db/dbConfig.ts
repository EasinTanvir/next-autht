import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connect = mongoose.connection;

    connect.on("connected", () => {
      console.log("MongoDB Connected");
    });

    connect.on("error", () => {
      console.log("MongoDB Connected");
      process.exit();
    });
  } catch (err) {
    console.log(err);
  }
}
