import express from "express"
import Product from "../Models/productModel.js";

export const productRoutes = express.Router()

productRoutes.get("/", async(req, res) => {
 try{
      let products = await Product.find()
      res.json({
        message: 'Getting products successfully',
        products: products
      })
 }
 catch(error){
  console.log(error)
 }
})

productRoutes.post('/', async(req, res) => {

const { title, price, category, desc } = req.body
if(!title || !price || !category || !desc)
{
  return res.status(400).json({
    message: 'Invalid data for creating a product',
    code: 400
  })
}

try{
const newProduct = new Product(req.body)
await newProduct.save();

res.json.json({
  message: 'Product created successfully',
  code: 201
})
  }
  catch(error)
  {
    console.log(error)
    if(error.code === 11000)
    {
      return res.status(400).json({
        message: 'Product with this title already exists',
        code: 400
      })
    }

    return res.status(500).json({
      message: 'Internal server error creating a user',
      code: 500
    })
  }
})