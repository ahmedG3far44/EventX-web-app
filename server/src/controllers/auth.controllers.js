import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import formatResponse from "../utils/formatResponse.js";

export const login = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload) {
      throw new Error("payload data is missing!!");
    }

    const { email, password } = payload;

    // check if User exist before or not

    const hash = await bcrypt.hash(password, 10);

    const isPasswordCorrect = await bcrypt.compare(password, hash);

    if (!isPasswordCorrect) {
      throw new Error("your email or password is wrong!!");
    }
    
    const user = await User.findOne({ email }).select({
      _id: 1,
      name: 1,
      email: 1,
      role: 1,
      age: 1,
      gender: 1,
      profileImage: 1,
    });

    console.log(user._doc);
    // compare email and passwords
    if (!user) {
      throw new Error("user not found your email or password is wrong!!");
    }

    // generate new token

    const token = jwt.sign(
      { ...user._doc, role: "USER" },
      process.env.JWT_SECRETE,
      {
        expiresIn: "24h",
      }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    const loggedUser = {
      ...user._doc,
    };

    res
      .status(200)
      .json(formatResponse(loggedUser, true, "login complete success"));
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

    console.log(payload);

    const { name, gender, age, email, password, profile } = payload;
    // check if User exist before or not

    // const hashedPassword = bcrypt.hash(password, 10);

    const user = await User.findOne({ email, password });

    // compare email and passwords
    if (user) {
      throw new Error("this User is already exist!!");
    }

    // hash new User password before add
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hash,
      role: "USER",
      gender,
      age,
      profileImage: profile,
    });

    await newUser.save();

    const token = jwt.sign(newUser._doc, process.env.JWT_SECRETE, {
      expiresIn: "24h",
    });
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const registeredUser = {
      ...newUser,
    };

    res
      .status(201)
      .json(
        formatResponse(
          registeredUser,
          true,
          "a new User was registered  success"
        )
      );
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
      secure: process.env.NODE_ENV === "production",
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

export const createDefaultAdmin = async (req, res) => {
  try {
    const random = Math.floor(Math.random() * 191) + 10;

    const adminProfile =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLKYamkRB_qMHdd_HvhrxBlHhExgcAW6Mquw&s";
    const newUser = new User({
      name: `Administrator ${random}`,
      email: `admin${random}@gmail.com`,
      password: "admin@password",
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
      process.env.JWT_SECRETE,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

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
