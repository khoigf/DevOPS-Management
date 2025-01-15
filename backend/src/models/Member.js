const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true }, // Tên của thành viên
  role: { type: String, required: true } // Vai trò của thành viên trong dự án
});

module.exports = mongoose.model('Member', memberSchema);
