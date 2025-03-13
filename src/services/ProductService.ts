import { IProduct } from "@src/models/Products";
import ProductRepo from "@src/repos/ProductRepo";
import UserRepo from "@src/repos/UserRepo";



/**
 * Add products
 */
function addProducts(product: IProduct ): Promise<void> {
  return ProductRepo.add(product);
}
  


/**
 * Get all products
 */
function getAllProducts(): Promise<IProduct []| null> {
  return ProductRepo.getAll();
}  


  
/**
 * Get all products
 */
function getOneProduct(id:string): Promise<IProduct| null> {
  return ProductRepo.getOne(id);
}  




export default {
  getAllProducts,
  getOneProduct,
  addProducts,

} as const;