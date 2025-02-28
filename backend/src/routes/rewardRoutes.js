const express = require('express');
const router = express.Router();
const rewardController = require('../../controllers/rewardController');
const authMiddleware = require('../../utils/authMiddleware');

// Criar recompensa (admin)
router.post('/', authMiddleware, rewardController.createReward);

// Listar recompensas (disponível para todos)
router.get('/', rewardController.getRewards);

// Resgatar recompensa (usuário logado)
router.post('/redeem', authMiddleware, rewardController.redeemReward);

module.exports = router;
