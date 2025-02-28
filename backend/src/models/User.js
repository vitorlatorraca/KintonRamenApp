const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  stamps: {
    type: Number,
    default: 0,
  },
  // Caso queira histórico de carimbos individuais, use array de refs:
  // stampsHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stamp' }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
