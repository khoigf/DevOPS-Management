const User = require('../models/User');

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

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};