const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("view engine", "ejs");
app.set("views", "ejs-pages"); // default is 'views' folder

// use morgan for middleware
app.use(morgan("dev"));

app.get("/", (req, res) => {
  const blogs = [
    { title: "Smells like rotten eggs", body: "I had a patient today..." },
    { title: "Nurse seeing stars", body: "I could not believe my eyes!" },
    { title: "How to defeat cancer", body: "We have discovered something..." },
  ];
  res.render("index", { title: "Home", blogs: blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog Post" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Page not Found" });
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});
