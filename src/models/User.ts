import { isString } from 'jet-validators';
import { parseObject, TParseOnError } from 'jet-validators/utils';

import {  transIsDate } from '@src/util/validators';


/******************************************************************************
                                 Variables
******************************************************************************/

const DEFAULT_USER_VALS = (): IUser => ({
  id: '1',
  name: '',
  created: new Date(),
  password: '',
  email: '',
});


/******************************************************************************
                                  Types
******************************************************************************/

export interface IUser {
  passwordHash?: string;
  id: string;
  name: string;
  email: string;
  password: string;
  created: Date;
}


/******************************************************************************
                                 Functions
******************************************************************************/

/**
 * New user object.
 */
function newUser(user?: Partial<IUser>): IUser {
  const retVal = { ...DEFAULT_USER_VALS(), ...user };
  return parseUser(retVal, errors => {
    throw new Error('Setup new user failed ' + JSON.stringify(errors, null, 2));
  });
}

/**
 * Check is a user object. For the route validation.
 */
function testUser(arg: unknown, errCb?: TParseOnError): arg is IUser {
  return !!parseUser(arg, errCb);
}

/**
 * Parse a user object.
 */
const parseUser = parseObject<IUser>({
  id: isString,
  name: isString,
  email: isString,
  password: isString,
  created: transIsDate,
  passwordHash: (arg: unknown): arg is string | undefined => arg === undefined || isString(arg),
});


/******************************************************************************
                                Export default
******************************************************************************/

export default {
  new: newUser,
  test: testUser,
} as const;