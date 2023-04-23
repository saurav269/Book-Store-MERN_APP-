   import { comparePassword, hashPassword } from '../Helpers/authHelper.js'
   import userModel from '../Models/userModel.js'
   import JWT from 'jsonwebtoken'
   
   export const registerControler = async(req, res)=>{
      try{
         const{name,email,password,phone,address} = req.body
         //validation
         if(!name){
            return res.send({error : 'Name is required'})
         }
         if(!email){
            return res.send({error : 'email is required'})
         }
         if(!password){
            return res.send({error : 'password is required'})
         }
         if(!phone){
            return res.send({error : 'phone is required'})
         }
         if(!address){
            return res.send({error : 'address is required'})
         }
         //check user
         const existingUser = await userModel.findOne({email})
         //checking existing user
         if(existingUser){
            return res.status(200).send({
               sucess : true,
               msg : 'Already Register please login'
            })
         }
         //register user
         const hashedPassword = await hashPassword(password)
         //for save
         const user = await new userModel({name, email, phone, address, password : hashedPassword}).save()
         res.status(201).send({
            success:true,
            msg : 'User Register Successfully',
            user
         })

      }catch(err){
         console.log(err)
         res.status(600).send({
            success : false,
            msg : 'Error in Registration',
            err
         })   
      }  
   };

   //POST LOGIN
   export const loginControler = async(req, res)=>{
      try{
         const {email, password} = req.body
         //validation
         if(!email || !password){
            return res.status(404).send({
               success: false,
               msg : 'Invalid email or password'
            })
         }
         //check user
         const user = await userModel.findOne({email})
         if(!user){
            return res.status(404).send({
               success: false,
               msg : 'Email is not registered'
            })
         }
         const match = await comparePassword(password, user.password)
         if(!match){
            return res.status(200).send({
               success: false,
               msg : 'Invalid password'
            })
         }

         //creating Token
         const token = await JWT.sign({_id : user._id}, process.env.JWT_SEC,{
            expiresIn : '4d'
         });
         res.status(200).send({
            success:true,
            msg : 'Login Successfully',
            user : {
               name : user.name,
               email : user.email,
               phone:user.phone
            },
            token,
         })
      }catch(err){
         console.log(err)
         res.status(500).send({
            success : false,
            msg : 'Error in Login',
            err
         })
      }
   };

   //test controller
   export const testController=(req,res)=>{
      res.send('Protected Route')

   }
  