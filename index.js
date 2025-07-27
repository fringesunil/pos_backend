require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const categoryRoutes = require('./routes/categoryRoute')
const productRoutes = require('./routes/productRoute')
const customerRoutes = require('./routes/customerRoute')
const app = express()
const port = 3000

app.use(express.json())
app.use("/category",categoryRoutes)
app.use("/product",productRoutes)
app.use("/customer",customerRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


main().then(()=>console.log("Connected to DB")).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATA_BASE_URL);
}