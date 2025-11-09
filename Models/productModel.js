import mongoose from "mongoose"

//MongoDB schema
const productSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  price: Number,
  category: String,
  desc: String
},{
  timestamps: true
})

//MongoDB model
const Product = mongoose.model('products', productSchema)
export default Product