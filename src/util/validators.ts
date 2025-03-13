import { isNumber, isDate, isString  } from 'jet-validators';
import { transform } from 'jet-validators/utils';


/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Database relational key.
 */
export function isRelationalKey(arg: unknown): arg is number {
  return isString(arg) ;
}

/**
 * Convert to date object then check is a validate date.
 */
export const transIsDate = transform(
  arg => new Date(arg as string),
  arg => isDate(arg),
);
