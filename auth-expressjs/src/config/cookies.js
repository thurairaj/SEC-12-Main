function baseCookieOptions(name) {
		return {
			httpOnly: true,
			secure: false,
			sameSite: 'none',
			path:"/"
		}
}

module.exports = {
	baseCookieOptions
}
