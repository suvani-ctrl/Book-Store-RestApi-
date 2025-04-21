require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose')
const app = express();
const productRoutes = require('./routes/product-routes')
const bookRoutes = require('./routes/book-routes')

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('mongodb connected successfully'))
.catch((e) => console.log(e))

app.use('/products',productRoutes)
app.use("/books",bookRoutes)
//use middlewares

app.use(express.json())
app.listen(process.env.PORT,()=>{
    console.log(`server is now running on port 3000`)
})