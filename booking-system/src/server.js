const { app } = require('./app');
const { env } = require('./config/env');

app.listen(env.PORT, () => {
	console.log(`Server started on port ${env.PORT}`);
})
