import jwt from "jsonwebtoken";
import formatResponse from "../utils/formatResponse.js";
import { env } from "../configs/env.js";

const verifyAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json(formatResponse("Auth middleware error", false, "Authorization header is missing"));
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json(formatResponse("Auth middleware error", false, "token is missing!!"));
    }
    const decode = jwt.verify(token, env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res
      .status(500)
      .json(formatResponse("Auth middleware error", false, error.message));
  }
};

export default verifyAccessToken;
