function summation(num1, num2) {
	return (num1 + num2)/2
}

// for (let index = 9; index < 10; index++) {
// 	console.log(summation(index, index+1));
// }

// Write a function called printNumbers(n) that prints numbers from 1 to n
// 1 + 2

function printNumbers(n) {
	const condition = n + 1;
	// for (let i = 1; i < condition; i++) {
	// 	console.log(i);
	// }

	let index = 1
	while (index < condition) {
		if (index === 3) {
			index++
			continue;
		}


		if ( index >= 20)
			break;

		console.log(index);
		index++;


	}

	console.log(index)
}

function sumUpTo(n) {
	let sum = 0; // output

	let index = 1; // to keep the condition ( initialization )

	while (index < n + 1) { // check condition
		sum += index;  // sum = sum + index (shorthand sum += index)
		index++; // update tracker
	}

	return sum; //output
}


console.log(sumUpTo(5));
