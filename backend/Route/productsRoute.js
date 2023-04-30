import express from 'express'
import { isAdmin, requireSignIn } from '../Middlewares/authMiddleware.js'
import { 
    braintreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getProductController, 
    getSingleProductController,
    productCategoryController,
    productCountController,
    productFiltersController,
    productImageController, 
    productListController, 
    relatedProductController, 
    searchProductController, 
    updateProductController} from '../Controllers/productController.js'
import formidable from 'express-formidable';

const router = express.Router()
 
//Routes
router.post(
    '/create-product', 
    formidable(),
    createProductController)

    // FOR UPDATINGRoutes
     router.put(
    '/update-product/:pid', 
    // requireSignIn, 
    // isAdmin,
    formidable(),
    updateProductController)

//getting all the products
router.get('/get-product', getProductController)  

//single Product
router.get('/get-product/:slug', getSingleProductController) 


//FOR GETTING IMAGES
router.get('/product-photo/:pid' , productImageController)

//Delete Product
router.delete('/delete-product/:pid', deleteProductController)

//Filter Product
router.post('/product-filters' , productFiltersController)

//FOR PAGINATION
router.get('/product-count', productCountController)

//PRODUCT PER PAGE
router.get('/product-list/:page', productListController)

//SEARCH PRODUCT
router.get('/search/:keyword', searchProductController)

//SIMILAR PRODUCT
router.get('/related-product/:pid/:cid', relatedProductController)

//CATEGORY WISE PRODUCT
router.get('/product-category/:slug', productCategoryController)

//PAYMENTS ROUTES
//TOKEN
router.get('/braintree/token', braintreeTokenController)

//PAYMENTS
router.post('/braintree/payment', requireSignIn, braintreePaymentController)

export default router