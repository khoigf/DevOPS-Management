const User = require('../models/User');
const Project = require('../models/Project');
const Phase = require('../models/Phase');
const Member = require('../models/Member');
const Task = require('../models/Task');
const Tool = require('../models/Tool');
const Configuration = require('../models/Configuration');
const Issue = require('../models/Issue');
const Log = require('../models/Log');

exports.addUser = async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    const newUser = new User({ username, password, email, role });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

exports.updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { username, email, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { username, email, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
};

exports.deleteUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(user_id);
    const projects = await Project.find({ owner_id: user_id });
    for (let project of projects) {
      await Phase.deleteMany({ project_id: project._id });
      await Member.deleteMany({ project_id: project._id });
      await Task.deleteMany({ project_id: project._id });
      await Tool.deleteMany({ project_id: project._id });
      await Configuration.deleteMany({ project_id: project._id });
      await Issue.deleteMany({ project_id: project._id });
      await Log.deleteMany({ project_id: project._id });
    }
    await Project.deleteMany({ owner_id: user_id });

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};