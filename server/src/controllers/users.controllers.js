import User from "../models/user.js";

export const getUsersList = async (req, res) => {
  try {
    const users = await User.find().select({
      _id: 1,
      email: 1,
      name: 1,
      age: 1,
      profileImage: 1,
      createdAt: 1,
      updatedAt: 1,
      role: 1,
    });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};



