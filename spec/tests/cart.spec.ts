import supertest from 'supertest';
import app from '@src/server';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import Paths from 'spec/support/Paths';
import { TRes } from 'spec/support';

/******************************************************************************
                                 Tests
******************************************************************************/

describe('CartRouter', () => {

  const agent = supertest.agent(app);

  // Test add to cart
  describe(`"POST:${Paths.Cart.add}"`, () => {

    // Test add to cart success
    it(`should return a status code of "${HttpStatusCodes.OK}" if the ` + 
    'item was successfully added to the cart.', done => {
      const item = { id: 1, amount: 2 };
      agent
        .post(Paths.Cart.add)
        .send(item)
        .end((_, res) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          // Add more assertions based on the expected response
          done();
        });
    });

    // Missing item data
    it('should return a JSON object with an error message and a status ' + 
      `code of "${HttpStatusCodes.BAD_REQUEST}" if the item data was ` + 
      'missing.', done => {
      agent
        .post(Paths.Cart.add)
        .send({})
        .end((_, res: TRes) => {
          expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
          // Add assertions for error message
          done();
        });
    });
  });

  // Test get cart by user ID
  describe(`"GET:${Paths.Cart.get}"`, () => {

    // Test get cart success
    it(`should return a status code of "${HttpStatusCodes.OK}" if the ` + 
    'cart was successfully retrieved.', done => {
      const userId = 1;
      agent
        .get(Paths.Cart.get.replace(':id', userId.toString()))
        .end((_, res) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          // Add more assertions based on the expected response
          done();
        });
    });
  });

  // Test update cart item by ID
  describe(`"PATCH:${Paths.Cart.updateItem}"`, () => {

    // Test update cart item success
    it(`should return a status code of "${HttpStatusCodes.OK}" if the ` + 
    'cart item was successfully updated.', done => {
      const item = { id: 1, amount: 3 };
      agent
        .patch(Paths.Cart.updateItem.replace(':id', item.id.toString()))
        .send(item)
        .end((_, res) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          // Add more assertions based on the expected response
          done();
        });
    });
  });

  // Test delete cart item by ID
  describe(`"PATCH:${Paths.Cart.deleteItem}"`, () => {

    // Test delete cart item success
    it(`should return a status code of "${HttpStatusCodes.OK}" if the ` + 
    'cart item was successfully deleted.', done => {
      const itemId = 1;
      agent
        .patch(Paths.Cart.deleteItem.replace(':id', itemId.toString()))
        .end((_, res) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          // Add more assertions based on the expected response
          done();
        });
    });
  });

  // Test checkout cart
  describe(`"POST:${Paths.Cart.checkout}"`, () => {

    // Test checkout success
    it(`should return a status code of "${HttpStatusCodes.OK}" if the ` + 
    'checkout was successful.', done => {
      agent
        .post(Paths.Cart.checkout)
        .end((_, res) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          // Add more assertions based on the expected response
          done();
        });
    });
  });
});
