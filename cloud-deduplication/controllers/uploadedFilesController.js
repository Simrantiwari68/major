// controllers/uploadedFilesController.js
const s3 = require('../utils/s3');

exports.getUploadedFiles = async (req, res) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // Your bucket name
    };

    const data = await s3.listObjectsV2(params).promise();

    // Extract relevant file information
    const uploadedFiles = data.Contents.map(file => ({
      name: file.Key,
      size: file.Size,
      lastModified: file.LastModified,
      // Add more fields if needed
    }));

    res.status(200).json(uploadedFiles);
  } catch (error) {
    console.error('Error fetching uploaded files:', error);
    res.status(500).json({ message: 'Error fetching uploaded files', error: error.message });
  }
};
