import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('_id username email role');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
