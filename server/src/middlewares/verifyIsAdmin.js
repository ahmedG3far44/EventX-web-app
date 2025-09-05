import jwt from "jsonwebtoken";
import formatResponse from "../utils/formatResponse.js";

const verifyIsAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("token is missing!!");
    }
    const decode = jwt.verify(token, process.env.JWT_SECRETE);
    if (decode.role !== "ADMIN") {
      throw new Error("only admins can access this!!");
    }
    req.user = decode;
    next();
  } catch (error) {
    res
      .status(500)
      .json(formatResponse("Auth middleware error", false, error.message));
  }
};

export default verifyIsAdmin;
