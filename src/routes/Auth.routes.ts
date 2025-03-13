import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { IReq, IRes, parseReq } from './common';
import AuthService from '@src/services/AuthService';
import { isEmail, isNonEmptyString } from 'jet-validators';





const Validators = {
  login: parseReq({ 
    email: isEmail, 
    password: isNonEmptyString,
  }),
} as const;






/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login 
 *     description: authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: An auth token and user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The authentication token.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user's unique identifier.
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: The user's email address.
 *              
 */
async function login(req: IReq, res: IRes) {
  const { email , password } = Validators.login(req.body);
  const result = await AuthService.login(email,password);
  res.status(HttpStatusCodes.OK).send(result);
}






  
export default {
  login,
} as const;