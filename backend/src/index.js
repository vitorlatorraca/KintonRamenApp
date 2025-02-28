const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const authRoutes = require('./routes/authRoutes');
const stampRoutes = require('./routes/stampRoutes');
const rewardRoutes = require('./routes/rewardRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/stamps', stampRoutes);
app.use('/api/rewards', rewardRoutes);

// Conexão com o banco de dados
mongoose.connect('mongodb://127.0.0.1:27017/kintonramen', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado ao MongoDB');
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
})
.catch((error) => {
  console.error('Erro de conexão com MongoDB:', error);
});
