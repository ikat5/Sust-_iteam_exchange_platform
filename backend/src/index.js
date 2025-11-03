import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "../db/index.js"
dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`port is listening at ${process.env.PORT || 5000}`);
     
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });
