// routes/upload.js
const express = require('express');
const uploadController = require('../controllers/uploadController');
const multer = require('multer');

const router = express.Router();

// Configure Multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /upload - Upload a single file
router.post('/', upload.single('file'), uploadController.uploadFile);

module.exports = router;
