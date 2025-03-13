import { ICart, ICartProduct } from "@src/models/Cart";
import CartRepo from "@src/repos/CartRepo";

/**
 * Add products
 */
async function addtoCart(cart: ICartProduct,userId:string): Promise<void> {
  return await CartRepo.addToCart(cart,userId);
}
  


/**
 * Retreive Cart
 */
async function retreiveCart(userId: string): Promise<ICart| undefined> {
  return await CartRepo.getUserCart(userId);
}
   



  
export default {
  addtoCart,
  retreiveCart,
} as const;