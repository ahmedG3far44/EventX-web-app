import jwt from "jsonwebtoken";
import formatResponse from "../utils/formatResponse.js";


const verifyIsAdmin = async (req, res, next) => {
  try {
    // get the token from req headers or cookies
    const token = req.headers.cookie.split("=")[1];

    if (!token) {
      throw new Error("token is missing!!");
    } 


    const payload = jwt.verify(token, process.env.JWT_SECRETE);

    console.log(payload);
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
