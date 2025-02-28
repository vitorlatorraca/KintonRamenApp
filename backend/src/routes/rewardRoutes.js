const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createReward,
  getAllRewards,
  redeemReward,
} = require('../controllers/rewardController');

// Criar recompensa (pode ser rota protegida, ex.: só o admin do restaurante)
router.post('/', authMiddleware, createReward);

// Listar todas as recompensas
router.get('/', authMiddleware, getAllRewards);

// Resgatar recompensa
router.post('/:userId/:rewardId', authMiddleware, redeemReward);

module.exports = router;
