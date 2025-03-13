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
   

function getCartByUserId(userId: string): Promise<void> {
  console.log('getCartByUserId called with:', userId);
  return Promise.resolve();
}

function updateCartItemById(id: string): Promise<void> {
  console.log('updateCartItemById called with:', id);
  return Promise.resolve();
}

function deleteCartItemById(id: string): Promise<void> {
  console.log('deleteCartItemById called with:', id);
  return Promise.resolve();
}

function clearCartItemById(id: string): Promise<void> {
  console.log('clearCartItemById called with:', id);
  return Promise.resolve();
}


  
export default {
  addtoCart,
  getCartByUserId,
  updateCartItemById,
  deleteCartItemById,
  clearCartItemById,
  retreiveCart,
} as const;
