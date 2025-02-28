const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addStamp, getStamps } = require('../controllers/stampController');

// Adiciona um carimbo ao usuário
router.post('/add/:userId', authMiddleware, addStamp);

// Lista carimbos de um usuário
router.get('/user/:userId', authMiddleware, getStamps);

module.exports = router;
