const sequelize = require('./db');
const app = require('./app');
const config = require("./config");

sequelize.sync( { alter: true}).then(() => {
	console.log('Database connection successfully established');
	app.listen(config.port, () => {
		console.log(`App listening on port ${config.port}`);
	});
}).catch((err) => {
	console.error(err, 'DB Connection Error occurred');
})
