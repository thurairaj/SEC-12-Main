const {createObjectCsvWriter} = require("csv-writer");
const path = require("path");

async function generateCSV(orders) {
	const filePath = path.join(__dirname, '../report/orders.csv');

	const csvWriter = createObjectCsvWriter({
		path: filePath,
		header: [
			{id: 'id', title: 'Order Id'},
			{id: 'amount', title: 'Order Amount'},
			{id: 'status', title: 'Order Status'},
			{id: 'userName', title: 'User Name'},
		]
	})

	await csvWriter.writeRecords(orders.map(order => {
		return {
			id: order.id,
			amount: order.amount,
			status: order.status,
			userName: order.User.name,
		}
	}))

	return filePath;
}

module.exports = generateCSV;
