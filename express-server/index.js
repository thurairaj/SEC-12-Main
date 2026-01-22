const express = require('express');

const app = express();
const users = []; // substituted by db

// TODO
app.use(express.json());

/*
	CRUD operation
 */

// CREATE
app.post('/user', (req, res) => {
	const userCreationRequest = req.body;
	const user = {};
	user.name = userCreationRequest.name;
	user.username = userCreationRequest.username;
	user.age = userCreationRequest.age;
	user.phoneNumber = userCreationRequest.phoneNumber;
	user.email = userCreationRequest.email;
	user.id = Date.now().toString();
	users.push(user);
	res.status(200).json(user)
})

// READ ALL
app.get('/user',  (req, res) => {
	res.status(200).json(users)
})

// READ ONE USER?
app.get('/user/:id', (req, res) => {
	const userId = req.params.id;
	const user = users.find(user => user.id === userId)
	if (user) {
		res.status(200).json(user)
	} else {
		res.status(404).end()
	}
})

app.put('/user/:id', (req, res) => {
	const userId = req.params.id;
	const payload = req.body;
	const user = users.find(user => user.id === userId)
	if (user) {
		user.name = payload.name;
		res.status(200).json(user)
	} else {
		res.status(404).end()
	}
})

app.delete('/user/:id', (req, res) => {
	const userId = req.params.id;
	const user = users.find(user => user.id === userId);
	if (user) {
		const indexOfUser = users.findIndex(user => user.id === userId)
		users.splice(indexOfUser, 1);
	}
	res.status(200).json(user)
})


app.listen(3000, () => {
	console.log('Express server started');
})
/*
	[browser] --- magic ---> [server = machine] ---> PORT
 */

