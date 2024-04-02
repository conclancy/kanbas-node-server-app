import mongoose from "mongoose";

// create the user schema 
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
      //default: "USER",
    },
  },

  // store data in the "users" collection
  { collection: "users" }
);

export default userSchema;