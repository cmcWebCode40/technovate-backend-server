import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';
import { ResponseUtil } from '../utils/response.util';

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      res.status(401).json(
        ResponseUtil.error('No token provided')
      );
      return;
    }
    
    const token = authHeader?.split(" ")[1];

    const decoded = verifyToken(token);
    
    req.userId = decoded.userId;
    req.userEmail = decoded.email;

    next();
  } catch  {
    res.status(401).json(
      ResponseUtil.error('Invalid or expired token')
    );
  }
};