import ProductService from '@src/services/ProductService';
import { IReq, IRes, parseReq } from './common';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { isNumber, isString } from 'jet-validators';
import { transform } from 'jet-validators/utils';

const Validators = {
  get : parseReq({ id: isString }),
} as const;




/**
 * @swagger
 * /products:
 *   get:
*     summary: List all Products
 *     description: gets  products
 *     responses:
 *       200:
 *         description:  array of products
 *         content:
 *           application/json:
 *             
 *              
 */
async function getAllProducts(_: IReq, res: IRes) {
  const products = await ProductService.getAllProducts();
  res.status(HttpStatusCodes.OK).json({ products });
}






/**
 * @swagger
 * /product:
 *   get:
*     summary: List details about a Product
 *     description: gets  product
 *     responses:
 *       200:
 *         description:  Object with details about the product
 *         content:
 *           application/json:
 *             
 *              
 */
async function getProduct(req: IReq, res: IRes) {
  const { id } = Validators.get(req.params);
  const product = await ProductService.getOneProduct(id);
  
  res.status(HttpStatusCodes.OK).json({ product });
}


  
export default {
  getProduct,
  getAllProducts,
} as const;