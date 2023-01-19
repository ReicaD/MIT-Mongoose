const { db } = require("../models/blogs");
const Blogs = require("../models/blogs");

//POST added a new BLOG "/add-blogs"

const addBlog = (req, res) => {
  const blogs = new Blogs({
    title: req.body.title,
    snippet: req.body.snippet,
    actors: req.body.actors,
    people: req.body.people,
  });
  if (!users.title) res.status(404).json({ msg: "Please finn in title" });
  if (!users.snippet) res.status(404).json({ msg: "Please fill in snippet" });
  if (!users.actors) res.status(404).json({ msg: "Please fill  in actors" });
  if (!users.people)
    res.status(404).json({ msg: "Please fill in number of people" });

  // console.log("please enter title.");
  // res.json({ msg: "Please fill in the required fields" }).status(400);

  blogs
    .save()
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  //
};

// GET get all blogs
const allBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    if (!blogs.length) {
      res.send({ msg: "No blogs at the moment, create one here" }).status(404);
    }
    res.send(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error" });
  }
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
  // console.log("This is snippet ==>", req.query.snippet);
  try {
    let snippetQuery = req.query.snippet;
    const snippet = await Blogs.find({ snippet: snippetQuery });
    // console.log(snippet)
    if (!snippet.length) {
      res.send(`Sorry ${snippetQuery} is not here, try again`).res.status(404);
    }
    res.send(snippet).status(200);
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
};

//returning limited querries
const limitBlogs = async (req, res) => {
  console.log(req.query.limit);
  try {
    let limit = req.query.limit;
    const blogs = await Blogs.find().limit(limit);
    // console.log(blogs.length)
    res.send(blogs).status(200);
  } catch (err) {
    console.log(err.message);
    res.status(500);
  }
};

const update_Blogs = async (req, res) => {
  try {
    // console.log(req.params.id)
    console.log(req.body);
    const blogs = await Blogs.updateOne(
      { _id: req.params.id },
      {
        $set: {
          people: req.body.people,
          title: req.body.title,
          snippet: req.body.snippet,
          actors: req.body.actors,
        },
      },
      { upsert: true }
    );
    
    // console.log(blogs);
    res.send(blogs).status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

// controller for updating user info inside userController
// write missing logic for user controllers
// write query for getting specific user info
// query for users to get limited number of users

// db.posts.updateOne(
//   req.params.id,
//   { $set: { body: req.actors.actors, date: Date() } },
//   { upsert: true }
// );

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
  update_Blogs,
};
