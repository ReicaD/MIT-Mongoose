const express = require("express");

const {
  allUsers,
  AddUser,
  removeUserById,
  getUserbyId,
  update_Users,
  addLikes,
  limitUsers,
  
} = require("../controllers/userController");
const router = express.Router();

router.post("/add-users", AddUser);
router.get("/all-Users", allUsers);
router.get("/get-UserById/:id", getUserbyId);
router.get("/remove-userById/:id", removeUserById);
router.get("/update_Users/:id",update_Users);
router.post("/addLikes",addLikes);
router.get("/limitUsers",limitUsers)

module.exports = router;