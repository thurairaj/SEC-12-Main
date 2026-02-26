function setPaginationHeaders(res, {total, page, limit}){
	res.setHeader("x-page", page.toString());
	res.setHeader("x-limit", limit.toString());
	res.setHeader("x-total-count", total.toString());
	res.setHeader("x-total-page", Math.ceil(total / limit).toString());
}

function getPaginationHeaders(req){
	const page = parseInt(req.headers["x-page"]) || 1
	const limit = parseInt(req.headers["x-limit"]) || 100

	return {page, limit}
}


module.exports = {
	setPaginationHeaders,
	getPaginationHeaders
}
