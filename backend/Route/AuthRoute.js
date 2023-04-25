   
   import express from 'express'
import { 
   forgotPasswordController,
    loginControler,
    registerControler, 
    testController
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

   export default router