const Reward = require('../models/Reward');
const User = require('../models/User');

exports.createReward = async (req, res) => {
  try {
    const { name, requiredStamps, description } = req.body;
    const reward = new Reward({ name, requiredStamps, description });
    await reward.save();
    res.status(201).json({ message: 'Recompensa criada', reward });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

exports.getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.status(200).json(rewards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

exports.redeemReward = async (req, res) => {
  try {
    const { userId, rewardId } = req.body;
    const user = await User.findById(userId);
    const reward = await Reward.findById(rewardId);

    if (!user || !reward) {
      return res.status(404).json({ message: 'Usuário ou recompensa não encontrada' });
    }

    // Verifica se o usuário tem carimbos suficientes
    if (user.stampCount < reward.requiredStamps) {
      return res.status(400).json({ message: 'Carimbos insuficientes' });
    }

    // Desconta os carimbos
    user.stampCount -= reward.requiredStamps;
    await user.save();

    res.status(200).json({ 
      message: 'Recompensa resgatada com sucesso!',
      remainingStamps: user.stampCount 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};
