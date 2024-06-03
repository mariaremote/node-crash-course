const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((request, response) => {
  let path = "./pages";
  let route = request.url;
  console.log(`${request.method} request made to ${route}`);

  // lodash
  const num = _.random(0, 5);
  console.log(num);
  const greet = _.once(() => {
    console.log("Welcome to my Page!");
  });
  greet();
  greet();

  response.setHeader("Content-Type", "text/html");
  switch (route) {
    case "/":
      path += "/index.html";
      response.statusCode = 200;
      break;
    case "/index":
      response.statusCode = 301;
      response.setHeader("Location", "/");
      response.end();
      break;
    case "/contact":
      path += "/contact.html";
      response.statusCode = 200;
      break;
    default:
      path += "/404.html";
      response.statusCode = 404;
      break;
  }

  // response.write("<h1>Hello World</h1>");
  // response.write("<p>This is a node.js server</p>");
  // response.end();
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      response.end();
    } else {
      // response.write(data);
      response.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Server is running on http://localhost:3000");
});
