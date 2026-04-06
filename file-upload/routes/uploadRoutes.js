const express = require('express');
const upload = require('../middleware/localUpload');
const s3upload = require('../middleware/s3Upload');
const uploadToS3 = require('../utils/uploadToS3');

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

router.post('/image-s3', s3upload.single("image"), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({
				message: 'image not found',
			})
		}

		const result = await uploadToS3(req.file);
		return res.status(200).json({
			message: 'image success',
			data: {
				originalName: req.file.originalName,
				mimetype: req.file.mimetype,
				size: req.file.size,
				bucket: result.bucket,
				key: result.key,
				region: result.region,
				url: result.url,
			}
		})
	} catch (e) {

	}
})

module.exports = router
