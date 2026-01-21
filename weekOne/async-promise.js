function doSomething() {
	return new Promise((yayAllGood, screwThis) => {
		yayAllGood("doSomething")
		screwThis("error rejected")
	})
}

function handle(err) {
	console.log("err", err )
}

function doNext(data) {
	console.log(data);
	return new Promise(resolve => {
		resolve("doNext")
	})
}

function doLast(data) {
	console.log(data);
	return new Promise(resolve => {
		resolve("doLast")
	})
}

doSomething()
	.then(doNext)
	.then(doLast)
	.then(data => console.log(data))
	.catch(console.error);

console.log("3")






