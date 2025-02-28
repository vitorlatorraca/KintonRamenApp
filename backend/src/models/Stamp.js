const mongoose = require('mongoose');

const stampSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  orderId: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Stamp', stampSchema);
