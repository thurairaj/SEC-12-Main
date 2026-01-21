async function doSomething() {
	return "error"
}

async function doNext(data) {
	console.log(data);
	return "doNext"
}

async function doLast(data) {
	console.log(data);
	return "doLast"
}

async function main() {
	const data = await doSomething();
	const doNextData = await doNext(data);
	return doLast(doNextData);
}
const data = await main();
console.log(data);





