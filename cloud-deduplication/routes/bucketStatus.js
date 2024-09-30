// routes/bucketStatus.js
const express = require('express');
const bucketStatusController = require('../controllers/bucketStatusController');

const router = express.Router();

// GET /bucket-status - Retrieve S3 bucket status
router.get('/', bucketStatusController.getBucketStatus);

module.exports = router;
