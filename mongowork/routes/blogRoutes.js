const express = require("express");
const {
  addBlog,
  allBlogs,
  removeBlogById,
  getSingleBlogById,
  getSnippet,
  limitBlogs,
  update_Blogs,
} = require("../controllers/blogController");
const router = express.Router();

router.post("/add-blogs", addBlog);

router.get("/all-blogs", allBlogs);

router.get("/limit-blogs", limitBlogs);

router.put("/update_Blogs/:id", update_Blogs);

router.get("/snippet/", getSnippet);

router.get("/get-singleBlog/:id", getSingleBlogById);

router.delete("/remove-single-blog/:id", removeBlogById);

module.exports = router;
