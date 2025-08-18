import jwt from "jsonwebtoken";
import formatResponse from "../utils/formatResponse.js";

const jwtSecrete = process.env.JWT_SECRETE;

const verifyIsAdmin = async (req, res, next) => {
  try {
    console.log(req);
    // get the token from req headers or cookies
    const token = req;

    if (!token) {
      throw new Error("token is missing!!");
    }

    const { payload } = jwt.verify(token, jwtSecrete);

    if (!payload) {
      throw new Error("not payload returns");
    }

    if (payload.role !== "ADMIN") {
      throw new Error("only admins can access this!!");
    }

    req.user = payload;
    
    next();
  } catch (error) {
    res
      .status(500)
      .json(formatResponse("Auth middleware error", false, error.message));
  }
};

export default verifyIsAdmin;
