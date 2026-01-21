let globalScope = 1;
let localScope = 4;

// scope 2
if (1 === 1) {
	console.log("----- scope 2 ---")
	let scopeTwo = 2;
	console.log(scopeTwo)
	// scope 4
	if (1 === 1) {
		let scopeFour = 4;
		console.log("----- scope 4 ---")
		console.log(scopeTwo);
		console.log(scopeFour);

	}
}

// scope 3
if (1 === 1 ) {
	console.log("----- scope 3 ---")
	scopeThree = 3;
	console.log(scopeThree);

	// scope 5
	if (1 === 1) {
		console.log("----- scope 5 ---")
		scopeFive = 5;
		console.log(scopeThree);
		console.log(scopeFive);
	}

	// scope 6
	if (1 === 1) {
		console.log("----- scope 6 ---")
		scopeSix = 6;
		console.log(scopeThree);
		console.log(scopeSix);
	}
}

