const Users = require("../models/users");
// this function is to import a validate helper function to be able to validate emails.
const { validate, validateLink } = require("../helpers/helper");
const Blogs = require("../models/blogs");
const users = require("../models/users");

//POST added a new BLOG "/add-blogs"

const AddUser = (req, res) => {
  const users = new Users({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    bio: req.body.bio,
    link: req.body.link,
    likes: req.body.likes,
  });
  // const validateEmail = (email) => {
  //   return String(email)
  //     .toLowerCase()
  //     .match(
  //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     );
  // };
  // added helper function for validating the email.
  if (!validate(users.email))
    res.status(404).json({ msg: "Enter correct Email." });
  if (!validateLink(users.link))
    res.status(404).json({ msg: "Enter correct link." });

  // this is to check for user input before its submitted.
  if (!users.name) res.status(404).json({ msg: "Please add name" });
  if (!users.age) res.status(404).json({ msg: "Please add age" });
  if (!users.email) res.status(404).json({ msg: "Please add email" });
  if (!users.bio) res.status(404).json({ msg: "Please add bio" });
  if (!users.link) res.status(404).json({ msg: "Enter link" });
  if (!users.likes) res.status(404).json({ msg: "Enter likes" });

  users
    .save()
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//Getting All users
const allUsers = (req, res) => {
  Users.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//getting user by ids
const getUserbyId = async (req, res) => {
  try {
    const ID = await Users.findById(req.params.id);
    console.log(ID);
    if (!ID) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    res.send(ID);
  } catch (error) {
    console.log(error);
  }
  if (!validate(users.email))
    res.status(404).json({ msg: "Enter correct Email." });
  if (!validateLink(users.link))
    res.status(404).json({ msg: "Enter correct link." });
};

//removing users by ids

const removeUserById = async (req, res) => {
  try {
    const ID = await Users.findById(req.params.id);
    console.log(ID);
    if (!ID) {
      return res.status(404).json({ msg: "User not found err!" });
    }
    await ID.remove();
    res.json({ msg: "User Has been removed" });
  } catch (error) {
    console.log(err);
    res.status(500);
  }
};
const addLikes = async (req, res) => {
  try {
    let likesQuery = req.query.likes;
    const likes = await Users.find({ likes: likesQuery });
    //console.log(snippet)
    if (!likes.length) {
      res.send(`User ${likesQuery} not found`).res.status(400);
    }
    res.send(likes).status(200);
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
};
//returning limited numebr of users (query)
//query for users to get limited number of users.

const limitUsers = async (req, res) => {
  console.log(req.query.limitUsers);
  try {
    let limitUsers = req.query.limit;
    const allUsers = await Users.find().limit(limitUsers);
    res.send(allUsers).status(200);
  } catch (e) {
    console.log(e.message);
    res.status(500);
  }
};

const update_Users = async (req, res) => {
  try {
    console.log(req.body);
    const users = await Users.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          age: req.body.age,
          email: req.body.email,
          bio: req.body.bio,
          link: req.body.link,
          likes: req.body.likes,
        },
      },
      { upsert: true }
    );
    if (!validate(users.email))
    res.status(404).json({ msg: "Enter correct Email." });
  if (!validateLink(users.link))
    res.status(404).json({ msg: "Enter correct link." });

    // console.log(users)
    res.send(users).status(200);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
  
};

module.exports = {
  allUsers,
  AddUser,
  removeUserById,
  getUserbyId,
  update_Users,
  addLikes,
  limitUsers,
};

// controller for updating user info inside userController
// write missing logic for user controllers
// write query for getting specific user info.
// query for users to get limited number of users.
