import express from 'express'
import { isAdmin, requireSignIn } from '../Middlewares/authMiddleware.js'
import { 
    createProductController,
     deleteProductController,
     getProductController, 
     getSingleProductController,
      productImageController, 
      updateProductController} from '../Controllers/productController.js'
import formidable from 'express-formidable';

const router = express.Router()


//Routes
router.post(
    '/create-product', 
    requireSignIn, 
    isAdmin,
    formidable(),
    createProductController)

    //Routes
     router.put(
    '/update-product/:pid', 
    requireSignIn, 
    isAdmin,
    formidable(),
    updateProductController)

//getting all the products
router.get('/get-product', getProductController)  

//single Product
router.get('/get-product/:slug', getSingleProductController) 
export default router

//FOR GETTING IMAGES
router.get('/product-photo/:pid' , productImageController)

//Delete Product
router.delete('/delete-product/:pid', deleteProductController)