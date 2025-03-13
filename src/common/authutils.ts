import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HttpStatusCodes from './HttpStatusCodes';
import { IUser } from '@src/models/User';
import { AuthenticationError } from './route-errors';

// Generate JWT token
export const generateToken =  (user:IUser) => jwt.sign({
  id: user.id, 
  email: user.email, 
},
'your_secret_key', 
{ expiresIn: '1h' });


export const authMiddleware = (req: Request, res: Response, 
  next: NextFunction) => {
  const authHeader = req.headers.authorization;
      
  if (!authHeader) {
    return next(new AuthenticationError('Authorization header missing'));
  }
      
  const token = authHeader.split(' ')[1];
      
  if (!token) {
    return next(new AuthenticationError('Token missing'));
  }
      
  try {
    const decoded = jwt.verify(token, 'your_secret_key') as IUser;
    req.user = decoded; 
    next();
  } catch {
    next(new AuthenticationError('Invalid token'));
  }
};
      