# Node Crash Course - Blog

## Description

This is my implementation of the [Youtube Tutorial by Net Ninja](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU) for building a simple blog with `node.js` and `express.js` and `MongoDB`.

## Installation

1. Clone my repository: `git clone https://github.com/your-username/node-crash-course.git`
2. Navigate to the project directory: `cd node-crash-course`
3. Install dependencies: `npm install`
4. Set up your own `secrets.js` file with your own MongoDB account credentials (`dbUsername` and `dbPassword`)

## Usage

1. Start the server: `npm start`
2. Open your browser and visit `http://localhost:3000`
3. Explore the different routes and functionalities provided by the application.

## Packages Used

The following packages are used in this project:

- express: A fast, unopinionated, minimalist web framework for Node.js.
- nodemon: A utility that automatically restarts the server when changes are detected.
- mongoose: An elegant MongoDB object modeling tool for Node.js.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Known Issues (= todo's)

These are issues I have identified, that need fixing but haven't had the time to look into it. Please feel free to give feedback or hints :)

- weird logic of getting the same single post after having deleting it
- how to not use `try`/`catch` for getting a single post (better to control via `if`/`else`?)
- refactoring (MVC approach?)
