const express = require("express");

function logger(req, res, next) {
	console.log(req.method, req.url, req.body);
	next();
}

const app = express();
app.use(express.json());
app.use(logger)



app.post("/change", (req, res) => {
	res.send("Hello World!");
	res.end();
})

app.post("/loading", (req, res) => {
	const payload = req.body;
	const result = {
		cookedRice: payload.rice + 1,
	}
	res.send(result);
})

app.get("/something", (req, res) => {
	res.send("Welcome to Door Something!");
})



app.listen(3000, () => {
	console.log("Server running on port 3000");
});
