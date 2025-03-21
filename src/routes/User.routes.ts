import { isNumber, isString } from 'jet-validators';
import { transform } from 'jet-validators/utils';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import UserService from '@src/services/UserService';
import User from '@src/models/User';

import { IReq, IRes, parseReq } from './common';


/******************************************************************************
                                Variables
******************************************************************************/

const Validators = {
  add: parseReq({ user: User.test }),
  update: parseReq({ user: User.test }),
  delete: parseReq({ id: isString }),
} as const;


/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  res.status(HttpStatusCodes.OK).json({ users });
}

  /**
 * @swagger
 * /register:
 *   post:
 *     summary: Register 
 *     description: creates a user
 *     responses:
 *       200:
 *         description:  adds a user
 *         content:
 *           application/json:
 *             
 *              
 */
async function add(req: IReq, res: IRes) {
  const { user } = Validators.add(req.body);
  await UserService.addOne(user);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq, res: IRes) {
  const { user } = Validators.update(req.body);
  await UserService.updateOne(user);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const { id } = Validators.delete(req.params);
  await UserService.delete(id);
  res.status(HttpStatusCodes.OK).end();
}


/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
