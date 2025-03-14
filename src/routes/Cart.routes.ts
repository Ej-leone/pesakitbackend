/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {  isString ,isObjectArray, isNumber} from 'jet-validators';
import { parseObjectArray, IParseObjectError } from 'jet-validators/utils';
import { transform } from 'jet-validators/utils';
import CartService from '@src/services/CartService';
import { IReq, IRes, parseReq } from './common';
import HttpStatusCodes from '@src/common/HttpStatusCodes';






const Validators = {
  add : parseReq({ 
    userId: isString, 
    product: isObjectArray({
      productid: isString,
      amount: isNumber,
    })
  }),   
} as const;


/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add item to cart
 *     description: Add a specified item to the user's cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               product:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productid:
 *                       type: string
 *                     amount:
 *                       type: number
 *     responses:
 *       200:
 *         description: Item successfully added to cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     product:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           productid:
 *                             type: string
 *                           amount:
 *                             type: number
 */
async function addToCart(req: IReq, res: IRes) {
  const { userId , product} = Validators.add(req.body);
  const result  =  await CartService.addtoCart(product,userId);
  res.status(HttpStatusCodes.OK).send(result);
}



/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get cart by user ID
 *     description: Retrieve the cart for a specified user
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 */
async function getCartByUserId(req: IReq, res: IRes) {
  const { id } = Validators.add(req.params);
  const result  =  await CartService.getCartByUserId(id);
  res.status(HttpStatusCodes.OK).send(result);
}



/**
 * @swagger
 * /cart:
 *   put:
 *     summary: Update cart item by ID
 *     description: Update a specified item in the user's cart
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 */
async function updateCartItemById(req: IReq, res: IRes) {
  const { id } = Validators.add(req.params);
  const result  =  await CartService.updateCartItemById(id);
  res.status(HttpStatusCodes.OK).send(result);
}



/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Delete cart item by ID
 *     description: Remove a specified item from the user's cart
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 */
async function deleteCartItemById(req: IReq, res: IRes) {
  const { id } = Validators.add(req.params);
  const result  =  await CartService.deleteCartItemById(id);
  res.status(HttpStatusCodes.OK).send(result);
}



/**
 * @swagger
 * /cart/clear:
 *   post:
 *     summary: Clear cart by user ID
 *     description: Remove all items from the user's cart
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 */
async function clearCartItemById(req: IReq, res: IRes) {
  const { id } = Validators.add(req.params);
  const result  =  await CartService.clearCartItemById(id);
  res.status(HttpStatusCodes.OK).send(result);
}




/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: Checkout cart
 *     description: Process the checkout for the user's cart
 *     responses:
 *       200:
 *         description: Checkout successful
 *         content:
 *           application/json:
 *             
 *              
 */
function checkoutCart(req: IReq, res: IRes) {
  //mock a success checkout process
  res.status(HttpStatusCodes.OK).end();
}



    
export default {
  checkoutCart,
  addToCart,
  getCartByUserId,
  updateCartItemById,
  deleteCartItemById,
  clearCartItemById,
} as const;