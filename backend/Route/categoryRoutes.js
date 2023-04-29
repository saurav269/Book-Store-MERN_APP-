

 import express from 'express'
import { isAdmin, requireSignIn } from './../Middlewares/authMiddleware.js';
import { 
    categoryController, 
    createCategoryController,
    deleteCategoryController,
    singleCategoryController,
    updateCategoryController
     } from '../Controllers/categoryController.js';


 const router = express.Router()

 //routes 
 //create category
 router.post(
    '/create-category', 
    requireSignIn, 
    isAdmin,
    createCategoryController
    );

  //UPDATE category
  router.put('/update-category/:id', updateCategoryController);

  //GET ALL Categories
  router.get('/get-category', categoryController)

//SINGLE CATEGORY
 router.get('/single-category/:slug', singleCategoryController)

 //DELETE Category
 router.delete('/delete-category/:id', deleteCategoryController)


 export default router;