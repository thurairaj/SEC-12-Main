const id = "123"

function getUser(id, callback) {
	callback({name: "Thurai", order: [{id: 1, payment: {status: "done"}},{id: 2, payment: {status: "pending"}}]})
}

function getOrders(user, callback) {
	callback(user.order)
}

function getPayment(orders, callback) {
	callback(orders[0].payment);
}

getUser(id, (user) => {
	getOrders(user, (orders) => {
		getPayment(orders, (payment) => {
			console.log(payment);
		});
	});
});


function doSomething(callback) {
	callback("", "doSomething");
}

function handle(err) {
	console.log("err", err )
}

function doNext(data, callback) {
	console.log("doNextFunction", data);
	callback("", "doNext")
}

function doLast(data, callback) {
	console.log("doLastFunction", data);
	callback("", "doLast")
}


// doSomething((err, data) => {
// 	if (err) return handle(err);
// 	doNext(data, (err2, data2) => {
// 		if (err2) return handle(err2);
//
// 		doLast(data2, (err3, data3) => {
// 			if (err3) return handle(err3);
//
// 			console.log(data3);
// 		});
// 	});
// });



