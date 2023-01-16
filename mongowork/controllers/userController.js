const Users = require("../models/users");
// this function is to import a validate helper function to be able to validate emails.
const {validate} = require("../helpers/helper");

//POST added a new BLOG "/add-blogs"

const AddUser = (req, res) => {
  const users = new Users({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    bio: req.body.bio,
  });
  // const validateEmail = (email) => {
  //   return String(email)
  //     .toLowerCase()
  //     .match(
  //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     );
  // };
// added helper function for validating the email.
  if (!validate(users.email)) res.status(404).json({ msg: "Enter correct Email." });

// this is to check for user input before its submitted.
  if (!users.name) res.status(404).json({ msg: "Please add name" });
  if (!users.age) res.status(404).json({ msg: "Please add age" });
  if (!users.email) res.status(404).json({ msg: "Please add email" });
  if (!users.bio) res.status(404).json({ msg: "Please add bio" });

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
  Users.find(result)
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
    console.log(err);
  }
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
module.exports = { allUsers, AddUser, removeUserById, getUserbyId };
