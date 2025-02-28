const User = require('../models/User');
const Stamp = require('../models/Stamp');

exports.addStamp = async (req, res) => {
  try {
    const { userId } = req.body; 
    // userId é o ID do cliente que receberá o carimbo

    // 1. Incrementar o stampCount do usuário
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    user.stampCount += 1;
    await user.save();

    // 2. (Opcional) Criar um documento na coleção de stamps
    const newStamp = new Stamp({
      userId: userId,
      // orderId: se quiser vincular ao pedido
    });
    await newStamp.save();

    res.status(200).json({
      message: 'Carimbo adicionado com sucesso',
      stampCount: user.stampCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

exports.getStampsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const stamps = await Stamp.find({ userId });
    res.status(200).json(stamps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};
