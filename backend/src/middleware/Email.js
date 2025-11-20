// src/utils/email.js
import nodemailer from 'nodemailer';
import { Verification_Email_Template,Welcome_Email_Template } from './Email.template.js';

// Helper: Create transporter every time (safe & simple)
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendVerificationEamil = async (email, verificationCode) => {
  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: '"SUST Item Exchange" <tarit1243@gmail.com>',
    to: email,
    subject: 'Verify Your Email',
    text: `Your code: ${verificationCode}`,
    html: Verification_Email_Template.replace('{verificationCode}', verificationCode),
  });
  console.log('Verification email sent:', info.messageId);
  return info;
};

export const senWelcomeEmail = async (email, name) => {
  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: '"SUST Item Exchange" <tarit1243@gmail.com>',
    to: email,
    subject: 'Welcome!',
    text: `Hi ${name}, welcome!`,
    html: Welcome_Email_Template.replace('{name}', name),
  });
  console.log('Welcome email sent:', info.messageId);
  return info;
};

export const sendPasswordResetEmail = async (email, otp) => {
  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: '"SUST Item Exchange" <tarit1243@gmail.com>',
    to: email,
    subject: "Password Reset Code",
    text: `Your OTP code for resetting password: ${otp}`,
    html: `<h2>Your OTP for password reset is: ${otp}</h2>`,
  });
  console.log("Password reset email sent:", info.messageId);
  return info;
};