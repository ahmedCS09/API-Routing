import express from "express"
import Product from "../Models/productModel.js";
import mongoose from "mongoose";
import { validityMiddleware, emptyMiddleware } from "../Middleware/productMiddleware.js";

export const productRoutes = express.Router()

//inside products, default get route is this with queries
productRoutes.get('/', async (req, res) => {
  try {
    let queryObj = {}
    const query = req.query

    if (query.priceGT && query.priceLT) {
      queryObj = {
        ...queryObj,
        price: { $gt: Number(query.priceGT), $lt: Number(query.priceLT) }
      }
    }
    if (query.priceGT && !query.priceLT) {
      queryObj = {
        ...queryObj,
        price: { $gt: Number(query.priceGT) }
      }
    }
    if (query.priceLT && !query.priceGT) {
      queryObj = {
        ...queryObj,
        price: { $lt: Number(query.priceLT) }
      }
    }
    const products = await Product.find({ ...queryObj })
    res.status(200).json({
      message: 'Getting products sucessfully',
      code: 200,
      products: products
    })
  }
  catch (error) {
    console.log(error)
  }
})

//inside products, dynamic get route is this for ID
productRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const findProduct = await Product?.findById(id)

    if (!findProduct) {
      return res.status(404).json({
        message: 'Product does not exist with this id',
        user: null,
        code: 404
      })
    }
    res.status(200).json({
      message: 'Successfully getting a product',
      product: findProduct,
      code: 200
    })
  }
  catch (error) {
    console.log(error)
  }
})

//inside products, default post route is this which runs after middleware
productRoutes.post('/', validityMiddleware, async (req, res) => {
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

//inside products,dynamic delete route is this for ID 
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

    await Product.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
    res.status(200).json({
      message: 'Successfully deleted the selected product',
      code: 200,
      product: findProduct
    })
  } catch (error) {
    console.error(error)
  }
})

//inside products, dynamic put route is this for ID
productRoutes.put('/:id', emptyMiddleware, async (req, res) => {
  try {
    const { id } = req.params
    const { title, price, category, desc } = req.body
    let updatedProduct = await Product.findByIdAndUpdate(id, { ...req.body }, { new: true })
    res.status(200).json({
      message: 'Product updated successfully',
      code: 200,
      product: updatedProduct
    })
  }
  catch (error) {
    console.log(error)
  }
})