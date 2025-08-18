import jwt from "jsonwebtoken";
import formatResponse from "../utils/formatResponse";

const jwtSecrete = process.env.JWT_SECRETE;

const verifyAccessToken = async (req, res, next) => {
  try {
    console.log(req);

    const token = req;

    if (!token) {
      throw new Error("token is missing!!");
    }

    const { payload } = jwt.verify(token, jwtSecrete);
    req.user = payload;
    next();
  } catch (error) {
    res
      .status(500)
      .json(formatResponse("Auth middleware error", false, error.message));
  }
};

export default verifyAccessToken;
