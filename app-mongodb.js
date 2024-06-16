const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { result } = require("lodash");
const routes = require("./routes/blog-posts");
const Blog = require("./blogs");
const app = express();

// connect to MongoDB
const { dbUsername, dbPassword } = require("./secrets");
const dbURI = `mongodb+srv://${dbUsername}:${dbPassword}@test-cluster.9lmbixt.mongodb.net/?retryWrites=true&w=majority&appName=Test-Cluster`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) // prevent deprecation warnings
  .then((result) => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port http://localhost:3000");
    });
  })
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");
app.set("views", "ejs-pages"); // default is 'views' folder

// use morgan for middleware
app.use(morgan("dev"));

// making static files available
app.use(express.static("public"));

// middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// formatting
const dateFormat = {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour12: false,
  // hour: "2-digit",
  // minute: "2-digit",
};

// routes
app.get("/", (request, response) => {
  Blog.find()
    .sort({ date: -1 })
    .then((result) => {
      response.render("index", { title: "Home", blogs: result });
    });
  // const blogs = [
  //   { title: "Smells like rotten eggs", body: "I had a patient today..." },
  //   { title: "Nurse seeing stars", body: "I could not believe my eyes!" },
  //   { title: "How to defeat cancer", body: "We have discovered something..." },
  // ];
  // res.render("index", { title: "Home", blogs: blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/create", (req, res) => {
  res.render("create", { title: "Create Blog Post" });
});

app.use(routes);
app.use((request, response) => {
  response.status(404).render("404", { title: "Page not Found" });
});
