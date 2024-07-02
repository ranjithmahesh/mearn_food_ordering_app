import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    require: true,
  },
  email: { type: String, require: true },
  name: { type: String },
  city: String,
  country: String,
  addressLine1: String,
});

const User = mongoose.model("User", userSchema);
export default User;
