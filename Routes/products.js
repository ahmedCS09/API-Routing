import express from "express"
import Product from "../Models/productModel.js";
import mongoose from "mongoose";

export const productRoutes = express.Router()

productRoutes.get("/", async (req, res) => {
  try {
    let products = await Product.find()
    res.status(200).json({
      message: 'Getting products successfully',
      products: products,
      code: 200
    })
  }
  catch (error) {
    console.log(error)
  }
})

productRoutes.get("/:id", async(req, res) => {
  try {
    const { id } = req.params
    const findProduct = await Product?.findById(id)

    if (findProduct) {
      return res.status(200).json({
        message: 'Successfully getting a product',
        product: findProduct,
        code: 200
      })
    }

    res.status(404).json({
      message: 'Product does not exist with this id',
      user: null,
      code: 404
    })
  }
  catch (error) {
    res.json({
      message: error.message,
      user: null
    })
  }
})

productRoutes.post('/', async (req, res) => {

  const { title, price, category, desc } = req.body
  if (!title || !price || !category || !desc) {
    return res.status(400).json({
      message: 'Invalid data for creating a product',
      code: 400
    })
  }

  try {
    const newProduct = new Product(req.body)
    await newProduct.save()
      res.status(200).json({
      message: 'Product created successfully',
      product: newProduct,
      code: 200
    })

  }
  catch (error) {
    console.log(error)
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Product with this title already exists',
        code: 400
      })
    }

res.status(500).json({
      message: 'Internal server error creating a product',
      code: 100
    })
  }
})

productRoutes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const findProduct = await Product.findById(id)

    if (!findProduct) {
      return res.status(404).json({
        message: 'Product with this ID does not exist',
        code: 404,
        product: null
      });
    }

    await Product.deleteOne({_id: new mongoose.Types.ObjectId(id)})
      res.status(200).json({
      message: 'Successfully deleted the selected product',
      code: 200,
      product: findProduct
  })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      product: null
    })
  }
})

productRoutes.put('/:id', async(req, res) => {
     const { id } = req.params
     const { title, price, category, desc } = req.body
  if(!req.body)
  {
    return res.status(400).json({
      message: 'Invalid data for updating a product',
      code: 400,
      product: null
    })
  } 

  try{
  let updatedProduct = await Product.findByIdAndUpdate(id, {...req.body}, {new: true})
  res.status(200).json({
    message: 'Product updated successfully',
    code: 200,
    product: updatedProduct
  })
  }
  catch(error){
    console.log(error)
  }
})