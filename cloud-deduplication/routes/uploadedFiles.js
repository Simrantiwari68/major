// routes/uploadedFiles.js
const express = require('express');
const uploadedFilesController = require('../controllers/uploadedFilesController');

const router = express.Router();

// GET /uploaded-files - Retrieve list of uploaded files
router.get('/', uploadedFilesController.getUploadedFiles);

module.exports = router;
