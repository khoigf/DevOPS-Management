const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true, default: '0' },
});

module.exports = mongoose.model('Task', taskSchema);
