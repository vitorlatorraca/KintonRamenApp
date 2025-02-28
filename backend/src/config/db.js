const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1); // Para o servidor
  }
}

module.exports = { connectDB };
