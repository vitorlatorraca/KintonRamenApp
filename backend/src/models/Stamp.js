const mongoose = require('mongoose');

const stampSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  ramenType: {
    type: String,
    default: 'Classic Ramen',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Stamp', stampSchema);
