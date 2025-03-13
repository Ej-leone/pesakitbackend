import HttpStatusCodes from '@src/common/HttpStatusCodes';

import { IReq, IRes, parseReq } from './common';
import AuthService from '@src/services/AuthService';
import { isEmail, isNonEmptyString } from 'jet-validators';





const Validators = {
  login: parseReq({ 
    email: isEmail, 
    password: isNonEmptyString
  }),
} as const;






/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login 
 *     description: authenticate a user
 *     responses:
 *       200:
 *         description: An auth To
 *         content:
 *           application/json:
 *             
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