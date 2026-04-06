const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDirectory = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDirectory)) {
	fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDirectory);
	},

	filename: function (req, file, cb) {
		const uniqueName = `${Date.now()}-${file.originalname}`
		cb(null, file.originalname);
	}
})

const fileFilter = (req, file, cb) => {
	const allowedMimeTypes = ['image/png', 'image/jpeg'];

	if (!allowedMimeTypes.includes(file.mimetype)) {
		cb(new Error('Invalid file type'));
	}

	cb(null, true);
}

const localUpload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limit: {
		fileSize: 1024 * 1024 * 1024
	}
})

module.exports = localUpload;
