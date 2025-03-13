import { ICart, ICartProduct } from '@src/models/Cart';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';
/**
 * Get all carts.
 */
async function getUserCart(userid:string): Promise<ICart | undefined> {
  const db = await orm.openDb();
  return db.cart.find((cart) => cart.userid === userid );
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
  for (let i = 0; i < db.carts.length; i++) {
    if (db.carts[i].id === cart.id) {
      const dbCart = db.carts[i];
      db.carts[i] = {
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
async function deleteCart(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.carts.length; i++) {
    if (db.carts[i].id === id) {
      db.carts.splice(i, 1);
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