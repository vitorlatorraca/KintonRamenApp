const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  requiredStamps: { type: Number, required: true },
  description: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Reward', rewardSchema);
