const path = require('path');
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const s3 = require('../config/s3')

async function downloadToFile(key) {
	const command = new GetObjectCommand(key)
}

async function uploadToS3(file) {
	const key = generateS3Key(file);



	const command = new PutObjectCommand({
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: key,
		Body: file.buffer,
		ContentType: file.mimetype,
	})

	try {
		await s3.send(command);
	} catch (e) {
		console.error(e)
	}


	return {
		bucket: process.env.AWS_S3_BUCKET_NAME,
		key,
		region: process.env.AWS_REGION,
		url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
	}

}

function generateS3Key(file) {
	const ext = path.extname(file.originalname);
	const safeBaseName = path.basename(file.originalname).replace(/\s+/g, '-').toLowerCase();
	return `${safeBaseName}`;
}

module.exports = uploadToS3
