const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: Number,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    people: {
      type: String,
      required: true,
    },
    actors: {
      type: String,
      required: true,
    },
    //this generates timestamps for blog document  any time the objesct is created its going to auto value those properties
  },
  { timestamps: true }
);

const Blogs = mongoose.model("Blogs", blogSchema);
module.exports = Blogs;
