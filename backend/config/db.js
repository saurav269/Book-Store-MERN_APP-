  

   import mongoose from "mongoose";

   const connectDB = async()=>{ 
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log('Connect to Db')

    }catch(err){
        console.log(err)
    }
   }

   export default connectDB