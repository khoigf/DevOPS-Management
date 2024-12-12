const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true } // Vai trò của thành viên trong dự án
});

module.exports = mongoose.model('Member', memberSchema);
