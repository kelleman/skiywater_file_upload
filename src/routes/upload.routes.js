const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controllers');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Protected routes that require authentication

router.post('/upload', authenticateToken, uploadController.uploadFile, uploadController.handleFileUpload);


router.get('/files', authenticateToken, uploadController.getAllFiles);
router.get('/files/:fileId', authenticateToken, uploadController.getFileById);
router.delete('/files/:fileId', authenticateToken, uploadController.deleteFile);

module.exports = router;
