import slugify from "slugify";
import productModel from "../Models/productModel.js";
import fs from 'fs'
import categoryModel from "../Models/categoryModel.js";
import braintree from 'braintree'
import orderModel from "../Models/orderModel.js";
import dotenv from 'dotenv'

dotenv.config()

    //PAYMENT GETWAY
    var gateway = new braintree.BraintreeGateway({
        environment : braintree.Environment.Sandbox,
        merchantId: process.env.BRAINTREE_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY,
    });

  export const createProductController= async(req,res)=>{
    try{
        const {
            name,
            author,
            slug,
            description,
            price,
            category,
            quantity,
            shipping,
        } = req.fields

        const {image} = req.files;
        // Cheacking Validation
        switch(true){
            case !name :
                return res.status(500).send({error : "Name is required"})
            case !author :
                return res.status(500).send({error : "Author is required"})
            case !description :
                return res.status(500).send({error : "Description is required"}) 
            case !price :
                    return res.status(500).send({error : "Price is required"})
            case !category :
                return res.status(500).send({error : "category is required"})
            case !quantity :
                return res.status(500).send({error : "quantity is required"})  
            case image && image.size > 1000000 :
                    return res.status(500).send({error : "Image is required and should be less than 1mb"})                      
        }

        const products = new productModel({...req.fields, slug :slugify(name)})

        if(image){
            products.image.data = fs.readFileSync(image.path)
            products.image.contentType = image.type
        }
        await products.save()
        res.status(200).send({
            success : true,
            message : 'Book has been created',
            products,
        });
    }catch(err){
        console.log(err)
        res.status(500).send({
            succes : false,
            message : 'Error in creating New product',
            err,
        })
    }
  };


  //getting all the products
  export const getProductController=async(req,res)=>{
    try{
        const products = await productModel
        .find({})
        .populate('category')
        .select('-image')
        .limit(12)
        .sort({createdAt:-1})
        res.status(200).send({
           success : true,
           countTotal:products.length,
           message : 'All Products',
           products,
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success : false,
            message : 'Error in getting Products',
            err,
        })
    }
  };

  //GEETING SINGLE PRODUCT
  export const getSingleProductController= async(req, res)=>{
    try{ 
        const product = await productModel
        .findOne({slug : req.params.slug})
        .select('--image')
        .populate('category')
        res.status(200).send({
            success : true,
            message : 'Single Product getting successfully',
            product,
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success : false,
            message : 'Error while getting single product',
            err,
        })
    }
  };

  //getting Image
  export const productImageController=async(req, res)=>{
    try{
        const product = await productModel
        .findById(req.params.pid)
        .select('image')
        if(product.image.data){
            res.set('Content-type', product.image.contentType)
            return res.status(200).send(product.image.data)
        }
    }catch(err){
        console.log(err)
        res.status(500).send({
            success : false,
            message : 'Error while getting Photo',
            err,
        })
    }
  };

  //For updating Product
  export const updateProductController=async(req,res)=>{
    try{
        const {
            name,
            author,
            slug,
            description,
            price,
            category,
            quantity,
            shipping,
        } = req.fields

        const {image} = req.files;
        // Cheacking Validation
        switch(true){
            case !name :
                return res.status(500).send({error : "Name is required"})
            case !author :
                return res.status(500).send({error : "Author is required"})
            case !description :
                return res.status(500).send({error : "Description is required"}) 
            case !price :
                    return res.status(500).send({error : "Price is required"})
            case !category :
                return res.status(500).send({error : "category is required"})
            case !quantity :
                return res.status(500).send({error : "quantity is required"})  
            case image && image.size > 1000000 :
                    return res.status(500).send({error : "Image is required and should be less than 1mb"})                      
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug:slugify(name)},{new : true})

        if(image){
            products.image.data = fs.readFileSync(image.path)
            products.image.contentType = image.type
        }
        await products.save()
        res.status(200).send({
            success : true,
            message : 'Book has been Updated',
            products,
        });

    }catch(err){
        console.log(err)
        res.status(500).send({
            success : false,
            message : 'Error while updating Product',
            err,
        })

    }

  };

  //For deleting Product
  export const deleteProductController=async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.params.pid)
        .select('-image')
        res.status(200).send({
            success : true,
            message : 'Product deleted successfully',
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success : false,
            message : 'Error while Deleting Photo',
            err,
        })
    }
  };

  //For filtering Products
  export const productFiltersController=async(req, res)=>{
    try{
        const { checked, radio} = req.body;
        let args = {}
        if(checked.length > 0) args.category = checked
        if(radio.length) args.price = {$gte: radio[0], $lte:radio[1]}
        const products = await productModel.find(args)
        res.status(200).send({
            success : true,
            message : 'Product filtered successfully',
            products,
        });
    }catch(err){
        console.log(err)
        res.status(400).send({
            success : false,
            message : 'Error while Filtering products',
            err,
        })
    }
  };

  //FOR PAGINATION
  export const productCountController=async(req, res)=>{
    try{
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success : true,
            message : 'Pagination done successfully',
            total,
        });

    }catch(err){
        console.log(err)
        res.status(400).send({
            success : false,
            message : 'Error while Pagination products',
            err,
        })  
    }
  };

  //FOR PER PAGE PRODUCT
  export const productListController=async(req, res)=>{
    try{
        const perPage = 3;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).select('-image').skip((page-1) * perPage).limit(perPage).sort({createdAt : -1});
        res.status(200).send({
            success : true,
            message : 'Pagination per page done successfully',
            products,
        });

    }catch(err){
        console.log(err)
        res.status(400).send({
            success : false,
            message : 'Error in per page products',
            err,
        }) 

    }
  };

  //SEARCH PRODUCT FUNCTION
  export const searchProductController=async(req,res)=>{
      try{
        const {keyword} = req.params;
        const results = await productModel.find({
            $or : [
                {name : {$regex : keyword, $options : 'i'}},
                {description : {$regex : keyword, $options : 'i'}},
            ]
        }).select('-image');
        res.json(results);
      }catch(err){
        console.log(err)
        res.status(400).send({
            success : false,
            message : 'Error in searching products',
            err,
        }) 
      }
  };

   //FOR SIMILAR PRODUCT FUNCTION
    export const relatedProductController=async(req, res)=>{
        try{
            const {pid, cid} = req.params;
            const products = await productModel.find({
                category:cid,
                _id:{$ne:pid}
            }).select('-image').limit(3).populate('category')
            res.status(200).send({
                success : true,
                message : 'Similar Product done successfully',
                products,
            });
        }catch(err){
            console.log(err)
        res.status(400).send({
            success : false,
            message : 'Error in Similar products function',
            err,
        }) 

        }
    };

    //CATEGORY WISE PRODUCT
    export const productCategoryController= async(req, res)=>{
        try{
            const category = await categoryModel.findOne({slug:req.params.slug})
            const products = await productModel.find({category}).populate('category')
            res.status(200).send({
                success : true,
                message : 'Cate wise Product done successfully',
                category,
                products ,
            });

        }catch(err){
            console.log(err)
            res.status(400).send({
                success : false,
                message : 'Error while getting cate wise products function',
                err,
            }) 
        }
    };
    //PAYMENT GETWAY API
    export const braintreeTokenController= async(req, res)=>{
        try{
            gateway.clientToken.generate({}, function(err,response){
                if(err){
                    res.status(500).send(err)
                }else{
                    res.send(response)
                }
            })
        }catch(err){
            console.log(err)
        }
    };

    //PAYMENT
    export const braintreePaymentController=async(req, res)=>{
        try{
            const {cart, nonce} = req.body;
            let total = 0;
            cart.map((i) => {
                total += i.price
            });
            let newTransaction = gateway.transaction.sale({
                amount:total,
                paymentMethodNonce : nonce,
                options : {
                    submitForSettlement : true
                }
            },
            function(err, result){
                if(result){
                    const order = new orderModel({
                        products : cart,
                        payment : result,
                        buyer : req.user._id,
                    }).save()
                    res.json({ok:true})
                }else{
                    res.status(500).send(err)
                }
            }
            )
        }catch(err){
            console.log(err)
        }
    };
