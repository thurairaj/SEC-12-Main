const http = require("http");


const serverFunction = (request, response) => {
	console.log(request);
	response.write("Hello from Node server");
	response.write("Hello from Node server");
	response.end();
}

const server = http.createServer(serverFunction);

server.listen(3000, () => {
	console.log("Server running on port 3000");
});
