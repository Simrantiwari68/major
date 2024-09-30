// // server.js
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Import Routes
// const uploadRoute = require('./routes/upload');
// const uploadedFilesRoute = require('./routes/uploadedFiles');
// const bucketStatusRoute = require('./routes/bucketStatus');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/upload', uploadRoute);
// app.use('/uploaded-files', uploadedFilesRoute);
// app.use('/bucket-status', bucketStatusRoute);

// // Root Route
// app.get('/', (req, res) => {
//   res.send('Cloud Deduplication Server is running');
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original file name
  }
});

const upload = multer({ storage });

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully', location: `/uploads/${req.file.filename}` });
});

// Serve the uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
