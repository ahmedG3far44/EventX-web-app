import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import formatResponse from "../utils/formatResponse.js";

const jwtSecrete = process.env.JWT_SECRETE;

export const login = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload) {
      throw new Error("payload data is missing!!");
    }

    const { email, password } = payload;
    // check if User exist before or not
    const user = await User.findOne({ email, password });
    // compare email and passwords
    if (!user) {
      throw new Error("your email or password is wrong!!");
    }

    // generate new token
    const token = jwt.sign(payload, jwtSecrete, {
      expiresIn: "7d",
    });

    const loggedUser = {
      ...user,
      token,
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

    const { email, password } = payload;
    // check if User exist before or not

    const hashedPassword = bcrypt.hash(password, 10);

    const User = await User.findOne({ email, password: hashedPassword });
    // compare email and passwords
    if (User) {
      throw new Error("this User is already exist!!");
    }

    // hash new User password before add

    const newUser = await User.create({ ...payload });
    // generate new token
    const token = jwt.sign(payload, jwtSecrete, {
      expiresIn: "7d",
    });

    const registeredUser = {
      ...newUser,
      token,
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
    res
      .status(200)
      .json(formatResponse("logout route", true, "login complete success"));
  } catch (error) {
    res
      .status(500)
      .json(formatResponse("internal server error", false, error.message));
  }
};
