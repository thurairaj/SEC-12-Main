function filterEven(arr) {
	const output = [];

	for(let i = 0; i < arr.length; i++) {
		const item = arr[i]; // get item in that index

		if (item % 2 === 0) {
			output.push(item);
		}
	}

	return output;

	// for (const item of arr) {
	// 	if (item % 2 === 0) {
	// 		output.push(item);
	// 	}
	// }

	// return arr.filter((element) => element % 2 === 0);
}

const list = {
	length: 5,
	type: "fruits"
}

const person = {
	firstName: "",
	lastName: "",
	age: 33
}

const classroom = [
	{
		firstName: "Thurairaj",
		lastName: "Letchumanan",
		age: 33
	},
	{
		firstName: "Thiery",
		lastName: "Henry",
		age: 53
	},
	{
		firstName: "Michael",
		lastName: "Owen",
		age: 73
	},
	{
		firstName: "Bukoyo",
		lastName: "Saka",
		age: 17
	},
]

const output = classroom.map(person => `${person.firstName} ${person.lastName}`);
const isLessThan20 = classroom.filter(person => person.age < 20);


const products = [
	{name: "wires", price: 50},
	{name: "pencil", price: 1.5},
	{name: "pen", price: 2},
	{name: "toner", price: 90},
	{name: "printer", price: 110},
]

const higherThan50 = [];
for (const product of products) {
	if (product.price > 50) {
		higherThan50.push(product);
	}
}

for (const product of higherThan50) {
	console.log(product.name);
}



console.log(products
	.filter(product => product.price > 50)
	.map(product => product.name));
