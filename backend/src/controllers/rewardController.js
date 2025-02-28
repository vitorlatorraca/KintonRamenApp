const Reward = require('../models/Reward');
const User = require('../models/User');

exports.createReward = async (req, res) => {
  try {
    const { title, requiredStamps, description } = req.body;
    const reward = new Reward({ title, requiredStamps, description });
    await reward.save();
    return res.status(201).json(reward);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

exports.getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({});
    return res.status(200).json(rewards);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

exports.redeemReward = async (req, res) => {
  try {
    const userId = req.params.userId;
    const rewardId = req.params.rewardId;

    const reward = await Reward.findById(rewardId);
    if (!reward) {
      return res.status(404).json({ message: 'Recompensa não encontrada.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (user.stamps < reward.requiredStamps) {
      return res.status(400).json({ message: 'Carimbos insuficientes.' });
    }

    // Desconta os carimbos do usuário
    user.stamps -= reward.requiredStamps;
    await user.save();

    return res.status(200).json({
      message: `Recompensa "${reward.title}" resgatada com sucesso!`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
