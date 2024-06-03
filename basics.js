const fs = require("fs");
let nvidia;

if (!fs.existsSync("./nvidia")) {
  fs.mkdir("./nvidia", (err) => {
    if (err) {
      console.log(err);
    }
  });
}
fs.readFile("/Users/maria/Downloads/nvidia.md", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    nvidia = data.toString();
    fs.writeFile("./nvidia/nvidia.txt", nvidia, (err) => {
      console.log(err);
    });
  }
});

const readStream = fs.createReadStream("/Users/maria/Downloads/nvidia.md", {
  encoding: "utf8",
});
readStream.on("data", (chunk) => {
  console.log("-----");
  console.log(chunk);
});
const writeStream = fs.createWriteStream("./nvidia/nvidia2.txt");

readStream.pipe(writeStream);

setTimeout(() => {
  if (fs.existsSync("./nvidia/nvidia.txt")) {
    fs.unlink("./nvidia/nvidia.txt", (err) => {
      console.log(err);
    });
  }
}, 40000);
