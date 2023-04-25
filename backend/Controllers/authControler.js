   import { comparePassword, hashPassword } from '../Helpers/authHelper.js'
   import userModel from '../Models/userModel.js'
   import JWT from 'jsonwebtoken'
   
   export const registerControler = async(req, res)=>{
      try{
         const{name,email,password,phone,address,answer} = req.body
         //validation
         if(!name){
            return res.send({message : 'Name is required'})
         }
         if(!email){
            return res.send({message : 'email is required'})
         }
         if(!password){
            return res.send({message : 'password is required'})
         }
         if(!phone){
            return res.send({message : 'phone is required'})
         }
         if(!address){
            return res.send({message : 'address is required'})
         }
         if(!answer){
            return res.send({message : 'Answer is required'})
         }
         //check user
         const existingUser = await userModel.findOne({email})
         //checking existing user
         if(existingUser){
            return res.status(200).send({
               sucess : true,
               message : 'Already Register please login'
            })
         }
         //register user
         const hashedPassword = await hashPassword(password)
         //for save
         const user = await new userModel({name, email, phone, address, answer, password : hashedPassword}).save()
         res.status(201).send({
            success : true,
            message : 'User Register Successfully',
            user
         })

      }catch(err){
         console.log(err)
         res.status(600).send({
            success : false,
            message : 'Error in Registration',
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
               message : 'Invalid email or password'
            })
         }
         //check user
         const user = await userModel.findOne({email})
         if(!user){
            return res.status(404).send({
               success: false,
               message : 'Email is not registered'
            })
         }
         const match = await comparePassword(password, user.password)
         if(!match){
            return res.status(200).send({
               success: false,
               message : 'Invalid password'
            })
         }

         //creating Token
         const token = await JWT.sign({_id : user._id}, process.env.JWT_SEC,{
            expiresIn : '4d'
         });
         res.status(200).send({
            success:true,
            message : 'Login Successfully',
            user : {
               _id : user._id,
               name : user.name,
               email : user.email,
               phone:user.phone,
               role:user.role,
            },
            token,
         })
      }catch(err){
         console.log(err)
         res.status(500).send({
            success : false,
            message : 'Error in Login',
            err
         })
      }
   };
   //ForgotPasswordController
    export const forgotPasswordController= async(req,res)=>{
      try{
         const {email,answer,newpassword} = req.body
         if(!email){
            res.status(400).send({
               message : 'Email is required'
            })
         }
         if(!answer){
            res.status(400).send({
               message : 'Answer is required'
            })
         }
         if(!newpassword){
            res.status(400).send({
               message : 'New Password is required'
            })
         }
         //CHECKING
         const user = await userModel.findOne({email,answer})
         //validation
         if(!user){
            return res.status(404).send({
               success : false,
               message : 'Wrong Email or Answer'
            })
         }
         const hashed = await hashPassword(newpassword)
         await userModel.findByIdAndUpdate(user._id, {password : hashed})
         res.status(200).send({
            success : true,
            message : 'Password Reset Successfully'
         })

      }catch(err){
         console.log(err)
         res.status(500).send({
            success : false,
            message : 'Something went wrong',
            err
         })
      }
   }

   //test controller
   export const testController=(req,res)=>{
      try{
         res.send('Protected Route')
      }catch(err){
         console.log(err)
         res.send({err})
      }

   }
  