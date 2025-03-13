import supertest from 'supertest';
import app from '@src/server';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import Paths from 'spec/support/Paths';
import { TRes } from 'spec/support';

/******************************************************************************
                                 Tests
******************************************************************************/

describe('ProductRouter', () => {

  const agent = supertest.agent(app);

  // Test get all products
  describe(`"GET:${Paths.Products.Get}"`, () => {

    // Test get all products success
    it(`should return a JSON object with all the products and a status code ` + 
    `of "${HttpStatusCodes.OK}" if the request was successful.`, done => {
      agent
        .get(Paths.Products.Get)
        .end((_, res: TRes<{ products: unknown[]}>) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          expect(Array.isArray(res.body.products)).toBeTruthy();
          // Add more assertions based on the expected response
          done();
        });
    });
  });

  // Test get one product
  describe(`"GET:${Paths.Products.Getone}"`, () => {

    // Test get one product success
    it(`should return a JSON object with the product and a status code of ` + 
    `"${HttpStatusCodes.OK}" if the request was successful.`, done => {
      const productId = 1;
      agent
        .get(Paths.Products.Getone.replace(':id', productId.toString()))
        .end((_, res: TRes<{ product: unknown }>) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          // Add more assertions based on the expected response
          done();
        });
    });

    // Product not found
    it('should return a JSON object with an error message and a status code ' + 
    `of "${HttpStatusCodes.NOT_FOUND}" if the product was not found.`, done => {
      const productId = -1; // Assuming -1 is an invalid ID
      agent
        .get(Paths.Products.Getone.replace(':id', productId.toString()))
        .end((_, res: TRes) => {
          expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
          // Add assertions for error message
          done();
        });
    });
  });
});
