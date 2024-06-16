const express = require("express");
const router = express.Router();
const Blog = require("../blogs");
const { dateFormat } = require("../app-mongodb");

router.get("/add-post", (request, response) => {
  const blog = new Blog({
    title: "New Way of Looking at Things3",
    body: "I have discovered a new way of looking at things.3",
    date: new Date(),
  });
  blog
    .save()
    .then((result) => {
      response.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/add-post", (request, response) => {
  const blogPost = new Blog({
    title: request.body.title,
    body: request.body.body,
    date: request.body.date,
  });
  blogPost
    .save()
    .then(() => {
      response.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/all", (request, response) => {
  Blog.find()
    .sort({ date: -1 })
    .then((result) => {
      response.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/post/:id", async (request, response) => {
  const postId = request.params.id;
  try {
    const result = await Blog.findById(postId);
    const formattedDate = result.date.toLocaleString("en-GB", dateFormat);
    response.render("details", {
      post: result,
      formattedDate,
      title: "Post Details",
    });
  } catch (error) {
    console.log("error in BE (getting post):\n", error);
    response.redirect("/");
  }
});

router.delete("/delete/:id", (request, response) => {
  const postId = request.params.id;
  Blog.findByIdAndDelete(postId)
    .then((result) => {
      response.redirect("/");
      console.log("Post deleted\n", result);
      //   result.json = { redirect: "/" };
    })
    .catch((err) => {
      console.log("error in BE (deleting post):\n", err);
    });
});

module.exports = router;
