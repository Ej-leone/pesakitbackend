import { IParseObjectError } from 'jet-validators/utils';

import HttpStatusCodes from '@src/common/HttpStatusCodes';


/******************************************************************************
                                 Classes
******************************************************************************/

/**
 * Error with status code and message.
 */
export class RouteError extends Error {
  public status: HttpStatusCodes;

  public constructor(status: HttpStatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}

/**
 * Handle "parseObj" errors.
 */
export class ValidationError extends RouteError {

  public static MESSAGE = 'The parseObj() function discovered one or ' + 
    'more errors.';

  public constructor(errors: IParseObjectError[]) {
    const msg = JSON.stringify({
      message: ValidationError.MESSAGE,
      errors,
    });
    super(HttpStatusCodes.BAD_REQUEST, msg);
  }
}

/**
 * Handle Authentication errors.
 */
export class AuthenticationError extends RouteError {

  public static MESSAGE = 'N';

  public constructor(errors: IParseObjectError[]) {
    const msg = JSON.stringify({
      errors,
    });
    super(HttpStatusCodes.UNAUTHORIZED, msg);
  }
}


/**
 * Not Found errors.
 */
export class NotFoundError extends RouteError {

  public static MESSAGE = 'Not Found';

  public constructor(errors: IParseObjectError[]) {
    const msg = JSON.stringify({
   
      errors,
    });
    super(HttpStatusCodes.NOT_FOUND, msg);
  }
}