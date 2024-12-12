const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  log_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Log', required: true },
  description: { type: String, required: true },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
  status: { type: String, required: true, default: '0' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Issue', issueSchema);
