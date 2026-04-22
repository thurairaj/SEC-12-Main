const CACHE_BACKEND = 'redis'
const CACHE_TTL = 3000
const MAX_CACHE_SIZE = 5
const REDIS_URL = 'redis://127.0.0.1:6379'

const KAFKA_BROKERS = ['localhost:9092']
const KAFKA_TOPIC = 'demo-topic';
const KAFKA_CLIENT_ID = 'redis-user-demo'

module.exports = {
	CACHE_BACKEND,
	CACHE_TTL,
	REDIS_URL,
	KAFKA_TOPIC,
	KAFKA_CLIENT_ID,
	KAFKA_BROKERS,
	MAX_CACHE_SIZE
}
