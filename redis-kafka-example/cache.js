const {CACHE_BACKEND, CACHE_TTL, MAX_CACHE_SIZE, REDIS_URL} = require('./config')

function createMemoryCache() {
	const NodeCache = require('node-cache');
	const inmemory = new NodeCache({
		stdTTL: CACHE_TTL,
		maxSize: MAX_CACHE_SIZE,
		useClones: false,
	});
	return {
		async connect() { return "connected"},
		async get(key) {
			const value = await inmemory.get(key);
			console.log("in-memory value", key, value);
			return value ?? null },
		async set(key, value) {  inmemory.set(key, value) },
		async flush() {  inmemory.flushAll() },
		async stats() { return {...inmemory.getStats(), keys: inmemory.keys() } }
	}

}

function createRedisCache() {
	const {createClient} = require('redis');
	const client = createClient({ url: REDIS_URL });

	async function connect() {
		await client.connect();
		console.log('Connected');
	}

	return {
		connect,
		async get(key) {
			const raw = await client.get(key);
			return raw ? JSON.parse(raw) : null;
		},
		async set(key, value) {  await client.set(key, JSON.stringify(value), {EX: CACHE_TTL}); },
		async flush() {  await client.flushDb()},
		async stats() {
			return await client.info('stats')
		}
	}
}

const cache = CACHE_BACKEND === 'redis' ? createRedisCache() : createMemoryCache();
console.log(CACHE_BACKEND);
module.exports = cache;

