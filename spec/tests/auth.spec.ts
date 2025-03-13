import supertest from 'supertest';
import app from '@src/server';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { ValidationError } from '@src/common/route-errors';

import Paths from 'spec/support/Paths';
import { parseValidationErr, TRes } from 'spec/support';

/******************************************************************************
                                 Tests
******************************************************************************/

describe('AuthRouter', () => {

  const agent = supertest.agent(app);

  // Test login
  describe(`"POST:${Paths.Auth.Login}"`, () => {

    // Test login success
    it(`should return a status code of "${HttpStatusCodes.OK}" if the ` + 
    'login was successful.', done => {
      const credentials = { email: 'sean.maxwell@gmail.com', password: 'password' };
      agent
        .post(Paths.Auth.Login)
        .send(credentials)
        .end((_, res) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          // Add more assertions based on the expected response
          done();
        });
    });

    // Missing credentials
    it('should return a JSON object with an error message and a status ' + 
      `code of "${HttpStatusCodes.BAD_REQUEST}" if the credentials were ` + 
      'missing.', done => {
      agent
        .post(Paths.Auth.Login)
        .send({ email: '', password: '' })
        .end((_, res: TRes) => {
          expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
          const errorObj = parseValidationErr(res.body.error);
          expect(errorObj.message).toBe(ValidationError.MESSAGE);
          expect(errorObj.errors[0].prop).toBe('email');
          expect(errorObj.errors[1].prop).toBe('password');
          done();
        });
    });
  });

  // Test register
  describe(`"POST:${Paths.Auth.Register}"`, () => {

    // Test register success
    it(`should return a status code of "${HttpStatusCodes.CREATED}" if the ` + 
    'registration was successful.', done => {
      const user = { name: 'New User', email: 'new.user@gmail.com', password: 'password' };
      agent
        .post(Paths.Auth.Register)
        .send({ user })
        .end((_, res) => {
          expect(res.status).toBe(HttpStatusCodes.CREATED);
          done();
        });
    });

    // Missing user data
    it('should return a JSON object with an error message and a status ' + 
      `code of "${HttpStatusCodes.BAD_REQUEST}" if the user data was ` + 
      'missing.', done => {
      agent
        .post(Paths.Auth.Register)
        .send({ user: null })
        .end((_, res: TRes) => {
          expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
          const errorObj = parseValidationErr(res.body.error);
          expect(errorObj.message).toBe(ValidationError.MESSAGE);
          expect(errorObj.errors[0].prop).toBe('user');
          done();
        });
    });
  });
});
