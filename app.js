import express from "express"
import { productRoutes } from "./Routes/products.js"
import mongoose from "mongoose"
import 'dotenv/config'
const app = express()
const port = 3000

//whenever a request from app comes in, it parses the body into JSON
app.use(express.json())
app.use("/products", productRoutes)

//MongoDB connection with app
let db_url = process.env.MONGODB_URL
mongoose.connect(db_url).then(() => console.log('mongodb connected sucessfully')).catch((error) => console.log(error))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
