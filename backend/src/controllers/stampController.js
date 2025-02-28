const User = require('../models/User');
const Stamp = require('../models/Stamp');

exports.addStamp = async (req, res) => {
  try {
    const userId = req.params.userId; // /api/stamps/add/:userId
    const { ramenType } = req.body;

    // Cria um novo registro de carimbo
    const newStamp = await Stamp.create({
      user: userId,
      ramenType,
    });

    // Incrementa a contagem de carimbos do usuário
    await User.findByIdAndUpdate(userId, { $inc: { stamps: 1 } });

    return res.status(201).json({
      message: 'Carimbo adicionado com sucesso.',
      stamp: newStamp,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

exports.getStamps = async (req, res) => {
  try {
    const userId = req.params.userId;
    const stamps = await Stamp.find({ user: userId }).sort({ createdAt: -1 });
    return res.status(200).json(stamps);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
