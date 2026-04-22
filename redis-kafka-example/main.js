const express = require('express');
const cache = require('./cache');
const {getProductById} = require("./db");

const app = express()
const PORT = 3000;
app.use(express.json());

function createCacheKey(key) {
	return `product:${key}`;
}

app.get('/health' , (req, res) => {
	res.status(200).send('OK');
})

app.get('/product/:id', async (req, res) => {
	const now = new Date();
	const id = req.params.id;
	const cacheKey = createCacheKey(id);

	const cached = await cache.get(cacheKey);
	if (cached) {
		console.log(cached, `Time taken: ${new Date() - now}`);
		return res.json({data: cached});
	}

	const product = await getProductById(id);
	if (!product)
		return res.status(404).send('Product not found');

	await cache.set(cacheKey, product);
	console.log(product, `Time taken: ${new Date() - now}`);
	return res.json({data: product});
})

app.get('/cache/stats', async (req, res) => {
	res.json(await cache.stats());
})

app.get('/clear-cache', async (req, res) => {
	await cache.flush();
	res.json("clear cache");
})

async function start() {
	await cache.connect();

	app.listen(3100, () => {
		console.log(`Listening on port 3100`);
	});
}

start().catch((err) => {
	console.error(err);
	process.exit(1);
})

