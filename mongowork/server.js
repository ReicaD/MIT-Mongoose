const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { db } = require("./models/blogs");
const Blogs = require("./models/blogs");
const { readdirSync } = require("fs");

//requiring .env to save environmental variables
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

readdirSync("./routes/").map((r) => {
  app.use("/api", require(`./routes/${r}`));
});

const dbURI = process.env.DATABASE_URI;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to mongodb"))
  .catch((err) => console.log(err.message));

//app.set("view engine, ejs");

// app.use(express.static("public"));
// app.use(morgan("dev"));

// app.use(express.static);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});

//POST added a new BLOG

// app.get("/about", (req, res) => {
//   res.render("about", { tittle: "about" });
// });

// app.get("/blogs/intro", (req, res) => {
//   res.render("intro", { tittle: "create new Blog" });
// });

// app.use((req, res) => {
//   res.status(404).render("404", { tittle: "404" });
// });
