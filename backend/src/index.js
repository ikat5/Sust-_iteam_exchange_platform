import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./app.js";
import connectDB from "../db/index.js"


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`port is listening at ${process.env.PORT || 5000}`);
      console.log("USER:", process.env.EMAIL_USER);
      console.log("PASS:", process.env.EMAIL_PASS);
     
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });
