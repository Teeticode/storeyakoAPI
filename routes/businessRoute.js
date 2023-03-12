const express = require('express');
const mongoose = require('mongoose');
const verifyUser = require('../middlewares/jwt.js');
const Business = require('../models/BusinessModel.js');
const Product = require('../models/ProductModel.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const verifyBiz = require('../middlewares/jwtbiz.js');

dotenv.config()
const businessRouter = express.Router();
const api = process.env.api_image
businessRouter.get('/',(req,res)=>{
    Business.find({}).sort({'createdAt':-1})
    .then(businesses=>{
        if(businesses){
            return res.status(200).json({results:businesses})
        }else{
            return res.status(404).json({error:"not found"})
        }
    })
    .catch(err=>{
        return res.status(500).json({error:"something went wrong"})
    })
})

businessRouter.get('/products/:id',(req,res)=>{
    Business.findById({_id:req.params.id})
    .then(business=>{
        if(business){
            Product.find({owner:business.owner})
            .then((products)=>{
                console.log({products,business})
                const prods = new Array()
                if(products.owner === business.owner){
                    return res.status(200).json(products)
                }else{
                    return res.status(200).json(products)
                }
            })
            
            
        }else{
            return res.status(404).json({error:"not found"})
        }
    })
    .catch(err=>{
        return res.status(500).json({error:"something went wrong"})
    })
})

businessRouter.get('/:id',(req,res)=>{
    Business.findById({_id:req.params.id})
    .then(business=>{
        console.log(business)
        if(business){
            return res.status(200).json({business:business})
        }else{
            return res.status(404).json({error:"not found"})
        }
    })
    .catch(err=>{
        return res.status(500).json({error:"something went wrong"})
    })
})
businessRouter.get('/allbiz/owner',verifyUser, (req,res)=>{
    Business.find({owner:req.user})
    .then((allbiz)=>{
        return res.status(200).json(allbiz)
    }).catch(err=>{
        return res.status(500).json(err)
    })
})

businessRouter.post('/',verifyUser,(req,res)=>{
    if(!req.body.name||!req.body.description||!req.body.category){
        return res.status(500).json({error:"Fill all fields"})
    }
    Business.findOne({name:req.body.name, owner:req.user})
    .then((businessname)=>{
        if(businessname){
            return res.status(500).json({error:"You already own a store"})
        }else{
            Product.find({owner:req.user})
            .then((products)=>{
                if(products){
                    const business = new Business({
                        name:req.body.name,
                        owner:req.user,
                        description:req.body.description,
                        products:products,
                        image:req.body.image,
                        category:req.body.category
                    })
                    business.save()
                    .then((business)=>{
                        return res.status(201).json({message:"store created successfully"})
                    }).catch((err)=>{
                        return res.status(500).json({error:"something went wrong"})
                    })
                }else{
                    const business = new Business({
                        name:req.body.name,
                        owner:req.user,
                        description:req.body.description
                    })
                    business.save()
                    .then((business)=>{
                        return res.status(201).json({message:"store created successfully"})
                    }).catch((err)=>{
                        return res.status(500).json({error:"something went wrong"})
                    })
                }
    })
    .catch((err)=>{
        return res.status(500).json({error:err})
    })
        }
    })
    .catch((err)=>{
        return res.status(500).json({error:"something went wrong"})
    })
    
    
})
businessRouter.post('/signin',verifyUser,(req,res)=>{
    Business.findOne({name:req.body.name})
    .then((biz)=>{
        if(biz){
            if(biz.owner === req.user){
                const token = jwt.sign(
                    {
                        bizId:biz._id, 
                        name:biz.name,
                        userId:req.user
                    },
                    process.env.TOKEN_SECRET_BIZ,
                    {expiresIn:'3w'}
                )
                return res.status(200).json({token:token})
            }else{
                return res.status(403).json({errro:"Invalid"})
            }
        }else{
            return res.status(404).json({error:"Business not found"})
        }
    }).catch(err=>{
        return res.status(500).json({error:"something went wrong"})
    })
})

businessRouter.put("/:id",verifyUser,(req,res)=>{
    Business.findById(req.params.id)
    .then((biz)=>{
        if(biz){
            console.log(req.biz)
            if(biz.owner === req.user){
                Business.findOne({name:req.body.name})
                .then((bizname)=>{
                    if(bizname){
                        return res.status(500).json({error:"Name is already taken"})
                    }else{
                        Business.findByIdAndUpdate(
                            biz._id,
                            {
                                name:req.body.name,
                                description:req.body.description
                            },
                            {new:true}
                        ).then(updateBiz=>{
                            return res.status(200).json({updatedBiz:updateBiz})
                        }).catch(err=>{
                            return res.status(500).json({error:"could not update your store"})
                        })
                    }
                }).catch(err=>{
                    return res.status(500).json({error:"something went wrong"})
                })
            }else{
                return res.status(403).json({error:"This store is not yours"})
            }
        }else{
            return res.status(404).json({error:"business not found"})
        }
    }).catch(err=>{
        return res.status(500).json({error:"something went wrong"})
    })
})

module.exports = businessRouter