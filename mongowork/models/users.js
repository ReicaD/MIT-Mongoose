const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    link:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const users = mongoose.model("User", userSchema);
module.exports = users;
