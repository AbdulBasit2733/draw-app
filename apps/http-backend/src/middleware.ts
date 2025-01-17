import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export interface AuthRequest extends Request {
  userId?: string;
}

export const Middleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"] ?? "";

  const decodedData = jwt.verify(token, JWT_SECRET);

  if (typeof decodedData == "string") {
    res.status(403).json({
        success:false,
        message:"Invalid Token"
    })
    return;
  }

  if (decodedData) {
    req.userId = decodedData.userId;
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Unauthorize !",
    });
  }
};
