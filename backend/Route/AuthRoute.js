   
   import express from 'express'
import { 
   forgotPasswordController,
    getAllOrdersController,
    getOrdersController,
    loginControler,
    orderStatusController,
    registerControler, 
    testController,
    updateProfileController
    } from '../Controllers/authControler.js'
import { isAdmin, requireSignIn } from '../Middlewares/authMiddleware.js';


   //router object
   const router = express.Router()

   //routing
   //REGISTER || POST METHOD
   router.post('/register', registerControler )

   //LOGIN || POST

   router.post('/login', loginControler);

   //FORGOT password route || POST

   router.post('/forgot-password', forgotPasswordController)


   //test routes
   router.get('/test', requireSignIn ,isAdmin, testController)

   //protected route auth for User
   router.get('/user-auth', requireSignIn, (req,res) =>{
      res.status(200).send({ok : true})
   })

      //protected route auth for ADMIN
      router.get('/admin-auth', requireSignIn, isAdmin, (req,res) =>{
         res.status(200).send({ok : true})
      })

      //update Profile
      router.put('/profile',requireSignIn, updateProfileController)

      //FOR CHECKING ORDERS
      router.get('/orders', requireSignIn, getOrdersController)

      //All Orders
      router.get('/all-orders', requireSignIn,isAdmin, getAllOrdersController)

      //ORDER STATUS UPDATE PURPOSE
      router.put('/order-status/:orderId', requireSignIn,isAdmin, orderStatusController)

   export default router