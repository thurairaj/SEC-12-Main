const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "folder", "readme.txt");
fs.readFile(filePath, "utf8", (err, data) => {
	console.log(data);
})
console.log("data");
