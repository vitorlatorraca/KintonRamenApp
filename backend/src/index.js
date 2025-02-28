require('dotenv').config(); // Carrega as variáveis do .env

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

// Rotas
const authRoutes = require('./routes/authRoutes');
const stampRoutes = require('./routes/stampRoutes');
const rewardRoutes = require('./routes/rewardRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexão com MongoDB
connectDB();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/stamps', stampRoutes);
app.use('/api/rewards', rewardRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
