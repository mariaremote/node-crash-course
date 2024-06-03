const express = require("express");

const app = express();

app.get("/", (req, res) => {
  //   res.send("hello");
  res.sendFile("./pages/index.html", { root: __dirname }); //__dirname gets the current directory for relative path
});

app.get("/contact", (req, res) => {
  //   res.send("contact me");
  res.sendFile("./pages/contact.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.redirect("/contact");
});

app.use((req, res) => {
  // will fire for each request! (therefore should be at bottom)
  res.status(404).sendFile("./pages/404.html", { root: __dirname });
});

app.listen(3000, () => {
  console.log("Server is running on port http:://localhost:3000");
});
