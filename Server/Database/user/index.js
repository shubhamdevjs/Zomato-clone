import mongoose  from "mongoose";


const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String },

    // "for" will be used for mentioning it as a tag as home or office
    address: [{ details: { type: String }, for: { type: String } }],
    
    phoneNumber: [{ type: Number }],
  },
  {
    timestamp: true,
  }
);

export const UserModel = mongoose.model("Users", UserSchema);