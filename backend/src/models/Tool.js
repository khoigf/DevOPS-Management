const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  status: { type: String, required: true, default: '1' },
  type: { type: String, required: true } // Loại công cụ (VD: CI/CD, Monitoring)
});

module.exports = mongoose.model('Tool', toolSchema);
