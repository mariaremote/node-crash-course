const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.set("views", "ejs-pages"); // default is 'views' folder

app.use((req, res, next) => {
  console.log("New request made:");
  console.log("host:", req.hostname);
  console.log("path:", req.path);
  console.log("method:", req.method);
  next();
});

app.use((req, res, next) => {
  console.log("in the next middleware...");
  next();
});

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
