

   import express from 'express'
   import dotenv from 'dotenv'
   import morgan from 'morgan';
   import connectDB from './config/db.js';
   import authRoutes from './Route/AuthRoute.js'
    
    //config env file
    dotenv.config();

    //database config
    connectDB()

    //rest object
    const app = express()

    //middlewares
    app.use(express.json())
    app.use(morgan('dev'))

    //all routes
    app.use('/api/v1/auth', authRoutes)

    //rest api
    app.get('/', (req,res) =>{  
    res.send('<h2>Welcome to my app</h2>')
    })

    //PORT
    const PORT = process.env.PORT

    //run server
    app.listen(PORT, () =>{
       console.log(`Server is running on ${PORT}`)
    })
