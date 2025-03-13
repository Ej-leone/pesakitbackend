/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ICart, ICartProduct } from '@src/models/Cart';

import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';
/**
 * Get all carts.
 */
async function getUserCart(userid:string): Promise<ICart | undefined> {
  const db = await orm.openDb();
  return db.cart.find((cart) => cart.userId === userid );
}

/**
 * Add one cart.
 */
async function addToCart(prod: ICartProduct,userid:string): Promise<void> {
  const db = await orm.openDb();
 // cart.userId =userid
  db.cart[0]?.product.push(prod);
  return orm.saveDb(db);
}

/**
 * Update a cart.
 */
async function updateCart(cart: ICart): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.cart.length; i++) {
    if (db.cart[i].userId === cart.userId) {
      const dbCart = db.cart[i];
      db.cart[i] = {
        ...dbCart,
        // Assuming carts have different properties than users
        // Update cart-specific properties here
      };
      return orm.saveDb(db);
    }
  }
}

/**
 * Delete one cart.
 */
async function deleteCart(id: string): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.cart.length; i++) {
    if (db.cart[i].userId === id) {
      db.cart.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}
    


export default {
  getUserCart ,
  deleteCart ,
  addToCart ,
  updateCart
} as const;