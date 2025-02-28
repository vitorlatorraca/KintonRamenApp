const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria usuário
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Verifica a senha
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Gera token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'segredo_super_secreto', // substitua por variável de ambiente
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login bem-sucedido',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        stampCount: user.stampCount,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // req.userId vem do middleware de autenticação
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};
