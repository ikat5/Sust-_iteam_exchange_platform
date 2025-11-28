import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "../db/index.js";
import { socketHandler } from "./utils/socket.js";

const PORT = process.env.PORT || 5000;
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
  : ["http://localhost:5173"];

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

socketHandler(io);

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening at ${PORT}`);
      console.log("USER:", process.env.EMAIL_USER);
      console.log("PASS:", process.env.EMAIL_PASS);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });
