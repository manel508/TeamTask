import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

export const isManager = (req, res, next) => {
  if (req.user?.role === "manager") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, manager only" });
  }
};
