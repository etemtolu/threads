import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MongoDB URL bağlantısı kurulmadı");
  if(isConnected) return console.log("Veritabanı bağlantısı başarılı.");

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Veritabanı bağlantısı başarılı.");
  } catch (error) {
    console.log("Veritabanı bağlantısı başarısız.", error);
  }
};
