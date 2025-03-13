import { Router } from 'express';

import Paths from '../common/Paths';
import UserRoutes from './User.routes';
import AuthRoutes from './Auth.routes';
import ProductRoutes from './Product.routes';
import CartRoutes from './Cart.routes';
import { authMiddleware } from '@src/common/authutils';

/******************************************************************************
                                Variables
******************************************************************************/

const apiRouter = Router();


// ** Add UserRouter ** //

// Init router
const userRouter = Router();

// Get all users
//TODO: turn this into admin routes
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

// Auth router
const AuthRouter = Router();

AuthRouter.post(Paths.Auth.Login,AuthRoutes.login);
AuthRouter.post(Paths.Auth.Register, UserRoutes.add);



// Product router
const ProductRouter = Router();

ProductRouter.get(Paths.Products.Get,ProductRoutes.getAllProducts);
ProductRouter.get(Paths.Products.Getone, ProductRoutes.getProduct);



// Cart router
const CartRouter = Router();

CartRouter.post(Paths.Cart.add
  ,authMiddleware,CartRoutes.addToCart);
CartRouter.get(Paths.Cart.get
  ,authMiddleware,CartRoutes.getCartByUserId);
CartRouter.patch(Paths.Cart.updateItem,
  authMiddleware,CartRoutes.updateCartItemById);
CartRouter.patch(Paths.Cart.deleteItem,
  authMiddleware,CartRoutes.deleteCartItemById);
CartRouter.post(Paths.Cart.checkout,
  authMiddleware, CartRoutes.checkoutCart);



// Admin Routes to
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Auth.Base, AuthRouter);
apiRouter.use(Paths.Products.Base, ProductRouter);
apiRouter.use(Paths.Products.Base, CartRouter);

/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
