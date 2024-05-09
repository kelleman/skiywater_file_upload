const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const { authenticateToken } = require('../middlewares/authMiddleware'); 

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authenticateToken, authController.logout);
module.exports = router;
