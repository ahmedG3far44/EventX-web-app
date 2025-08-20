import jwt from "jsonwebtoken";
import formatResponse from "../utils/formatResponse.js";


const verifyAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.cookie.split("=")[1];

    if (!token) {
      throw new Error("token is missing!!");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRETE);


    req.user = decode;
    next();
  } catch (error) {
    res
      .status(500)
      .json(formatResponse("Auth middleware error", false, error.message));
  }
};

export default verifyAccessToken;
