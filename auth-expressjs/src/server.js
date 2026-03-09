const { createApp } = require('./app');
const { connectToMongo } = require('./config/db');
const { config } = require('./config/env');

async function start() {
	await connectToMongo();
	const app = createApp();

	app.listen(config.port, () => {
		console.log(`Listening on port ${config.port}`);
		console.log(`AUTH_STRATEGY=${config.authStrategy}`)
	});
}

start().catch((err) => {
	console.error(err);
	process.exit(1);
})
