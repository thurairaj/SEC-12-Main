const myArray = ["1", "3", "17", "2", "9",  "117",]

// function functionName(parameter) {}
// const functionName = (parameter) => {}

const comparator =  (elementOne, elementTwo) => {
	if (elementOne < elementTwo) {
		return -1;
	}
	return 1;
}

console.log(myArray.length)
console.log(myArray.sort(comparator))


const fruits = ["apple", "guava", "pear"];

for (let i = 0; i < fruits.length; i++) {
	console.log(fruits[i]);
}

console.log("----")
for (const fruit of fruits) {
	console.log(fruit)
}


console.log(fruits[0].toUpperCase())
console.log(!fruits[4]);
