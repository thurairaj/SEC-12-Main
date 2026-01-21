// const p = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve("Done!");   // success
// 		// reject("Failed"); // failure
// 	}, 10000);
// });


async function doWork() {
	return "done";
}

async function main() {
	doWork().then(data => console.log("1", data));

	const data = await doWork();
	console.log("2", data);

	console.log("3", "work done");
}

await main();
console.log("3");
