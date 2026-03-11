const express = require('express');
const upload = require('../middleware/upload');

const router = express.Router();

router.post("/image", upload.single("image"), (req, res) => {
	if (!req.file) {
		return res.status(400).json({
			message: 'image not found',
		})
	}

	return res.status(200).json({
		message: 'image uploaded',
		file: {
			originalName: req.file.filename,
			filename: req.file.filename,
			mimeType: req.file.mimeType,
			size: req.file.size,
			url: `/uploads/${req.file.filename}`,
		}
	})
})

module.exports = router
