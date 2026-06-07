import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import formatResponse from "../utils/formatResponse.js";
import { env } from "../configs/env.js";

export const login = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) {
      throw new Error("payload data is missing!!");
    }
    const { email, password } = payload;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("user not found your email or password is wrong!!");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("your email or password is wrong!!");
    }
    const { password: _, ...userWithoutPassword } = user._doc;
    const token = jwt.sign(
      { ...userWithoutPassword },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    const loggedUser = {
      ...userWithoutPassword,
    };

    res.status(200).json({
      data: loggedUser,
      token,
      success: true,
      message: "login complete success",
    });
  } catch (error) {
    res
      .status(500)
      .json(
        formatResponse("[Error]: something went wrong ", false, error.message)
      );
  }
};

export const register = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) {
      throw new Error("payload data is missing!!");
    }
    const existingUser = await User.findOne({
      email: payload.email,
    });
    if (existingUser) {
      throw new Error("this User is already exist!!");
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const newUser = new User({
      ...payload,
      password: hashedPassword,
    });

    await newUser.save();

    const {
      _id,
      name,
      email,
      role,
      profileImage,
      address,
      isVerified,
      createdAt,
      updatedAt,
    } = newUser._doc;

    const token = jwt.sign(
      { _id, name, email, role, profileImage },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const registeredUser = {
      _id,
      name,
      email,
      role,
      profileImage,
      address,
      isVerified,
      createdAt,
      updatedAt,
    };

    res.status(201).json({
      data: registeredUser,
      token,
      success: true,
      message: "a new User was registered  success",
    });
  } catch (error) {
    res
      .status(500)
      .json(
        formatResponse("[Error]: something went wrong ", false, error.message)
      );
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.status(200).json(formatResponse("", true, "Logged out successfully"));
  } catch (error) {
    res
      .status(500)
      .json(formatResponse("internal server error", false, error.message));
  }
};

export const seedUsers = async (req, res) => {
  try {
    const demoUsers = [
      {
        name: "Demo Admin",
        email: "admin@eventx.com",
        password: "Admin@123",
        role: "ADMIN",
        isVerified: true,
        age: 30,
        gender: "male",
        profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      },
      {
        name: "Demo User",
        email: "user@eventx.com",
        password: "User@123",
        role: "USER",
        isVerified: true,
        age: 25,
        gender: "female",
        profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
      },
    ];

    const results = [];
    for (const demoUser of demoUsers) {
      const existing = await User.findOne({ email: demoUser.email });
      if (!existing) {
        const hashedPassword = await bcrypt.hash(demoUser.password, 10);
        const user = new User({ ...demoUser, password: hashedPassword });
        await user.save();
        results.push({ email: demoUser.email, action: "created" });
      } else {
        results.push({ email: demoUser.email, action: "already_exists" });
      }
    }

    res.status(200).json({
      success: true,
      data: {
        users: [
          { email: "admin@eventx.com", password: "Admin@123", role: "ADMIN" },
          { email: "user@eventx.com", password: "User@123", role: "USER" },
        ],
      },
      message: "Seed users processed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createDefaultAdmin = async (req, res) => {
  try {
    const random = Math.floor(Math.random() * 191) + 10;
    const hashedPassword = await bcrypt.hash("@Ranaa125", 10);
    const adminProfile =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLKYamkRB_qMHdd_HvhrxBlHhExgcAW6Mquw&s";
    const newUser = new User({
      name: `Administrator ${random}`,
      email: `admin${random}@gmail.com`,
      password: hashedPassword,
      role: "ADMIN",
      gender: "male",
      age: 23,
      profileImage: adminProfile,
    });
    await newUser.save();
    const payloadUser = newUser._doc;
    const { _id, name, email, age, gender, profileImage, role } = payloadUser;
    const token = jwt.sign(
      {
        _id,
        name,
        email,
        gender,
        age,
        role,
        profileImage,
      },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    const registeredUser = {
      ...payloadUser,
    };

    res
      .status(201)
      .json(
        formatResponse(registeredUser, true, "a new Admin was created success")
      );
  } catch (error) {
    res
      .status(500)
      .json(formatResponse("internal server error", false, error.message));
  }
};
