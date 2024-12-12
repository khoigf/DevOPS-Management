const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  value: { type: String, required: true } // Giá trị cấu hình
});

module.exports = mongoose.model('Configuration', configurationSchema);
