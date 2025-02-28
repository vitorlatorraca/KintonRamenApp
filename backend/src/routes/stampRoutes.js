const express = require('express');
const router = express.Router();
const stampController = require('../../controllers/stampController');
const authMiddleware = require('../../utils/authMiddleware');

// Adicionar carimbo (precisa de role admin ou do funcionário do restaurante)
router.post('/add', authMiddleware, stampController.addStamp);

// Listar carimbos de um usuário
router.get('/user/:userId', authMiddleware, stampController.getStampsByUser);

module.exports = router;
