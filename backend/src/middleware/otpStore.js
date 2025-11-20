// middleware/otpStore.js
const otpStore = new Map(); // email -> { otp, userData, expiresAt }

export const saveOTP = (email, otp, userData) => {
  otpStore.set(email, {
    otp,
    userData,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 min expiry
  });
};

export const getOTPData = (email) => otpStore.get(email);

export const verifyOTP = (email, otp) => {
  const data = otpStore.get(email);
  if (!data) return false;
  const valid = data.otp === String(otp) && Date.now() < data.expiresAt;
  if (valid) otpStore.delete(email);
  return valid;
};
