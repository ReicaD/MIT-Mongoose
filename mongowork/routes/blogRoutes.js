const express = require("express");
const {
  addBlog,
  allBlogs,
  removeBlogById,
  getSingleBlogById,
} = require("../controllers/blogController");
const router = express.Router();

router.post("/add-blogs", addBlog);

router.get("/all-blogs", allBlogs);

router.get("/get-singleBlog/:id", getSingleBlogById);

router.delete("/remove-single-blog/:id", removeBlogById);

module.exports = router;
