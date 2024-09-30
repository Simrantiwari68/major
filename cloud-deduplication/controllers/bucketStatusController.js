// controllers/bucketStatusController.js
const s3 = require('../utils/s3');

exports.getBucketStatus = async (req, res) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // Your bucket name
    };

    const data = await s3.getBucketLocation(params).promise();

    // Determine bucket region
    const region = data.LocationConstraint || 'us-east-1'; // 'us-east-1' is default if undefined

    res.status(200).json({ status: `Bucket is in region: ${region}` });
  } catch (error) {
    console.error('Error fetching bucket status:', error);
    res.status(500).json({ message: 'Error fetching bucket status', error: error.message });
  }
};
