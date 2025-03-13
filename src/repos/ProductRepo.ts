import { IProduct } from '@src/models/Products';
import orm from './MockOrm';
import { getRandomInt } from '@src/util/misc';





/**
 * Add one user.
 */
async function add(product: IProduct): Promise<void> {
  const db = await orm.openDb();
  product.id = getRandomInt();
  db.products.push(product);
  return orm.saveDb(db);
}


/**
 * Get one Product.
 */
async function getOne(id: string): Promise<IProduct  | null> {
  const db = await orm.openDb();
  for (const product of db.products) {
    if (product.id === id) {
      return product;
    }
  }
  return null;
}


/**
 * Get one Product.
 */
async function getAll(): Promise<IProduct [] | null> {
  const db = await orm.openDb();
  return db.products;
}


export default {
  getAll,
  getOne,
  add,
} as const;