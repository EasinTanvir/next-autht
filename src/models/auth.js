import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isVerfied: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgotPassowordToken: String,
  forgotPassowordexpire: Date,
  verifyToken: String,
  verifyTokenExpire: Date,
});

const USER = mongoose.models.users || mongoose.model("users", userSchema);
export default USER;
