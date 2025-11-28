// utils/socket.js
import jwt from "jsonwebtoken";
import Chat from "../model/Chat.model.js";

const sanitizeSocketUser = (userPayload = {}) => ({
  _id: userPayload._id,
  fullName: userPayload.fullName,
  userName: userPayload.userName,
});

export const socketHandler = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      socket.user = decoded; // attach user payload from token
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    if (!socket.user?._id) {
      socket.disconnect(true);
      return;
    }

    const userId = socket.user._id.toString();
    socket.join(userId);
    console.log("User connected:", userId);

    socket.on("sendMessage", async ({ receiverId, content }) => {
      if (!receiverId || !content?.trim()) {
        socket.emit("error", { message: "receiverId and content are required" });
        return;
      }

      try {
        const senderId = userId;

        let chat = await Chat.findOne({
          participants: { $all: [senderId, receiverId] },
        });

        const trimmedContent = content.trim();
        const newMessage = {
          senderId,
          content: trimmedContent,
        };

        if (chat) {
          chat.messages.push(newMessage);
          chat.lastMessage = trimmedContent;
        } else {
          chat = new Chat({
            participants: [senderId, receiverId],
            messages: [newMessage],
            lastMessage: trimmedContent,
          });
        }

        await chat.save();
        const savedMessage = chat.messages[chat.messages.length - 1];
        const senderProfile = sanitizeSocketUser(socket.user);

        const messagePayload = {
          _id: savedMessage._id,
          content: savedMessage.content,
          senderId: senderProfile,
          createdAt: savedMessage.createdAt,
          updatedAt: savedMessage.updatedAt,
        };

        // Send to receiver
        io.to(receiverId).emit("receiveMessage", {
          chatId: chat._id,
          message: messagePayload,
          senderId,
        });

        // Send back to sender (ack)
        socket.emit("messageSent", {
          chatId: chat._id,
          message: messagePayload,
        });
      } catch (err) {
        console.error("Failed to send message:", err);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", userId);
    });
  });
};