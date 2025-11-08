import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  price: Number,
  category: String,
  desc: String
},{
  timestamps: true
})

const Product = mongoose.model('products', productSchema)
export default Product