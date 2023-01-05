const Blogs = require("../models/blogs");

//POST added a new BLOG "/add-blogs"

const addBlog = (req, res) => {
  const blogs = new Blogs({
    title: req.body.title,
    snippet: req.body.snippet,
    actors: req.body.actors,
    people: req.body.people,
  });

  blogs
    .save()
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// GET get all blogs
const allBlogs = (req, res) => {
  Blogs.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// GET Blog by ID /get-singleBlog/:id"
const getSingleBlogById = async (req, res) => {
  try {
    const ID = await Blogs.findById(req.params.id);
    console.log(ID);
    if (!ID) {
      return res.status(404).json({ msg: "Err DOCUMENT doesn't exist!" });
    }
    ///await ID.find()

    // await res.json({ msg: "Blog Has been removed" });
    res.send(ID);
  } catch (err) {
    console.log(err);
  }
};

//remove singe blog by id remove-single-blog/:id
const removeBlogById = async (req, res) => {
  try {
    const ID = await Blogs.findById(req.params.id);
    console.log(ID);
    if (!ID) {
      return res.status(404).json({ msg: "Err Page doesn't exist!" });
    }
    await ID.remove();
    res.json({ msg: "Blog Has been removed" });

    // res.delete(ID);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

// Get blogs with series snippet
const getSnippet = async (req, res) => {
  try {
    const snippet = await Blogs.find({ snippet: "Series" });
    // console.log(snippet)
    res.send(snippet).status(200);
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
};

//returning limited querries
const limitBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find().limit(2);
    res.send(blogs).status(200);
  } catch (err) {
    console.log(err.message);
    res.status(500);
  }
};

//GET MyBlog by ID - @
// app.get("/get_blog_by_id", async (req, res) => {
//   try {
//   const blogId = await Blogs.findById("637ccce36cc9f878d7042f5b");
//     console.log(blogId);
//     if (!blogId) {
//       return res.status(400).send("Blog not found");
//     }
//     res.send(blogId);
//   } catch (err) {
//     console.log(err);
//     res.status(500);
//   }
// });

// app.get("/get-blogs", (req, res) => {
//   res.send("hello");
// });

//   app.get("/", (req, res) => {
//     // here __dirname gets the directory that we are in the index.html file
//     const blogs = [
//       { tittle: "Money Rules", snippet: "All You Need to know" },
//       { tittle: "All regulations", snippet: "See more" },
//       { tittle: "See tricks", snippet: "About money life" },
//     ]
module.exports = {
  addBlog,
  allBlogs,
  removeBlogById,
  getSingleBlogById,
  getSnippet,
  limitBlogs,
};
