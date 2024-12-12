const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  current_status: { type: String, required: true, default: '1' },
});

module.exports = mongoose.model('Project', projectSchema);
