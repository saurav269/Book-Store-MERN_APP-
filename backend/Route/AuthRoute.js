   
   import express from 'express'
import { 
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

   //test routes
   router.get('/test', requireSignIn ,isAdmin, testController)

   //protected route auth
   router.get('/user-auth', requireSignIn, (req,res) =>{
      res.status(200).send({ok : true})
   })

   export default router