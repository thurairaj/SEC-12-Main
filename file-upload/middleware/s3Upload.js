const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	const allowedMimeTypes = ['image/png', 'image/jpeg'];

	if (!allowedMimeTypes.includes(file.mimetype)) {
		cb(new Error('Invalid file type'));
	}

	cb(null, true);
}

module.exports = multer({
	storage: storage,
	fileFilter,
	limit: {
		fileSize: 1024 * 1024 * 1024
	}
})
