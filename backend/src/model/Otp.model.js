import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  purpose: { type: String, enum: ["signup", "reset"], required: true }, // signup or password reset
  expiresAt: { type: Date, required: true },
  userData: { type: Object }, // for signup data
});

export const Otp = mongoose.model("Otp", otpSchema);
