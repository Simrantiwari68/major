// controllers/uploadController.js
const s3 = require('../utils/s3');
const crypto = require('crypto');

// In-memory store for file hashes to detect duplicates
const uploadedFiles = new Map(); // Map<hash, location>

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Generate SHA-256 hash of the file buffer
    const fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex');

    // Check if the file already exists
    if (uploadedFiles.has(fileHash)) {
      return res.status(400).json({ message: 'File already exists', location: uploadedFiles.get(fileHash) });
    }

    // Define S3 upload parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,      // Your bucket name
      Key: file.originalname,                   // File name you want to save as in S3
      Body: file.buffer,                        // File buffer
      ContentType: file.mimetype,               // File MIME type
    };

    // Uploading files to the bucket
    const data = await s3.upload(params).promise();

    // Store the file hash and location
    uploadedFiles.set(fileHash, data.Location);

    // Respond with success message and file location
    res.status(200).json({ message: 'File uploaded successfully', location: data.Location });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
};
