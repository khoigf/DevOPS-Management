const mongoose = require('mongoose');

const phaseSchema = new mongoose.Schema({
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  description: { type: String },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  status: { type: String, required: true, default: '0' }
});

module.exports = mongoose.model('Phase', phaseSchema);
