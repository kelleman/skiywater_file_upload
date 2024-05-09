const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const File = require('../models/upload.model');
const { sendFileUploadedNotification } = require('../utils/socket.utils');
require('dotenv').config();

// Configure AWS S3 client 
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Configure Multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, 
});

// Handle single file upload
exports.uploadFile = upload.single('file');  

// route handler function for file upload
exports.handleFileUpload = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: Please log in to upload files' });
    }

    // Check if file uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Extract file details
    const { originalname, buffer } = req.file;

    // Generate a unique filename
    const filename = `${Date.now()}-${originalname}`;

    // Create S3 upload params
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      Body: buffer,
    };

    // Upload file to S3 with error handling
    try {
      await s3.upload(params).promise();
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      return res.status(500).json({ error: 'Failed to upload file to S3' });
    }

    // Save file metadata to MongoDB
    const file = new File({
      originalName: originalname,
      url: `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${filename}`,
      userId: req.user.userId,
      key: filename, // Save the generated filename as the key
    });
    await file.save();

    // Emit socket event for file upload notification (if applicable)
    sendFileUploadedNotification(file, req.app.get('io'));

    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get all files controller
exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get file by ID controller
exports.getFileById = async (req, res) => {
  try {
    const { fileId } = req.params;
    
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.status(200).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

  // Delete file function
  exports.deleteFile = async (req, res) => {
    try {
      const { fileId } = req.params;
      const { userId } = req.user;
  
      // Find the file
      const file = await File.findOne({ _id: fileId });
  
      // Check if the file exists
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
  
      // Check if the file belongs to the user
      if (file.userId.toString() !== userId) {
        return res.status(403).json({ error: "unable to delete, file does not belong to you" });
      }
  
      // Ensure file key exists
      if (!file.key) {
        return res.status(400).json({ error: 'File key missing' });
      }
  
      // Delete file from S3 bucket
      const s3 = new AWS.S3();
      await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: file.key }).promise();
  
      // Delete file metadata from MongoDB
      await File.findOneAndDelete({ _id: fileId });
  
      res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  



