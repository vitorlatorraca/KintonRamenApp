const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const authMiddleware = require('../../utils/authMiddleware');

// Registro
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Perfil do usuário (rota protegida)
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
