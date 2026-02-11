require('dotenv').config();

module.exports = {
	port: process.env.PORT || 3000,
	db: {
		database: process.env.DB_NAME || 'postgres',
		user: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASSWORD || '',
		host: process.env.DB_HOST || 'localhost',
		dialect: 'postgres',
	}
}
