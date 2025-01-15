const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
});

carSchema.index({ brand: 1 });
carSchema.index({ years: 1 });

module.exports = mongoose.model('Car', carSchema, 'Cars');
