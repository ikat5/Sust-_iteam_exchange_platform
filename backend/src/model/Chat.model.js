// models/Chat.model.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
  messages: [messageSchema],
  lastMessage: {
    type: String,
    default: "",
  },
}, { timestamps: true });

// Sort participants + Unique chat per pair
chatSchema.pre("save", function (next) {
  if (this.participants && this.participants.length > 1) {
    this.participants = [...new Set(this.participants.map((id) => id.toString()))]
      .map((id) => new mongoose.Types.ObjectId(id))
      .sort((a, b) => a.toString().localeCompare(b.toString()));
  }
  next();
});

// Unique chat between same users (no duplicate)
chatSchema.index({ participants: 1 }, { unique: true });

// Fast query: get user's recent chats
chatSchema.index({ "participants": 1, "updatedAt": -1 });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;