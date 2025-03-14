import { generateToken } from '@src/common/authutils';
import { AuthenticationError } from '@src/common/route-errors';
import { IUser } from '@src/models/User';
import UserRepo from '@src/repos/UserRepo';


/**
 * Login 
 */
async function login(email: string, password: string):
 Promise<{ user: IUser, token:string}> {
  const user = await UserRepo.findUserByEmail(email);
  if (!user) {
    throw new AuthenticationError('Email or Password Incorrect');
  }

  const isPasswordValid = await UserRepo.verifyPassword(user, password);
  if (!isPasswordValid) {
    throw new AuthenticationError('Invalid password');
  }

  // Additional logic for successful login can be added here
  const token =  generateToken(user);

  return {
    user, token,
  };
}
  


/**
 * Forgot Password
 */
function forgotPassword(email: string): Promise<void> {
  throw new Error('Not implemented');
}




export default {
  login,
  forgotPassword,
} as const;