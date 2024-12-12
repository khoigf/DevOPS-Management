const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  level: { type: String, enum: ['info', 'warning', 'error'], required: true },
  source: { type: String, required: true }, // Nguồn của log (VD: CI/CD pipeline)
  message: { type: String, required: true },
  event_type: { type: String },
  context: { type: mongoose.Schema.Types.Mixed }, // Dữ liệu bổ sung (JSON)
  error_code: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
