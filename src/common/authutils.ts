import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HttpStatusCodes from './HttpStatusCodes';
import { IUser } from '@src/models/User';

// Generate JWT token
export const generateToken =  (user:IUser) => jwt.sign({
  id: user.id, 
  email: user.email, 
},
'your_secret_key', 
{ expiresIn: '1h' });


export  const authMiddleware = (req: Request, 
  res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
      
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
      
  const token = authHeader.split(' ')[1];
      
  if (!token) {
    return res.status(HttpStatusCodes.UNAUTHORIZED)
      .json({ message: 'Token missing' });
  }
      
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded; // Attach decoded user info to request object
    next();
  } catch (error) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};
      