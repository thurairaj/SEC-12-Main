const products  = {
	1: {id: 1, name: 'Laptop', price: 5999},
	2: {id: 1, name: 'Phone', price: 3999},
	3: {id: 1, name: 'Tablet', price: 1999},
	4: {id: 1, name: 'Monitor', price: 799},
	5: {id: 1, name: 'Keyboard', price: 99},
	6: {id: 1, name: 'Mouse', price: 99},
	7: {id: 1, name: 'Headphones', price: 199}
}

async function getProductById(id) {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	console.log(`Fetched Product ID: ${id}`)
	return products[id] ?? null;
}

module.exports = {getProductById}
