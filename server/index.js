const express = require('express')
const bodyParser = require('body-parser')
const cookParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')

require('colors')
require('dotenv').config()

const { server_port } = require('./config/env')
const { errorHandler } = require('./middleware/errorHandler')
const dbConnection = require('./config/connection/database')
const authRoutes = require('./routes/user-routes/authRoutes')
const productRoutes = require('./routes/product-routes/productRoutes')
const blogRoutes = require('./routes/blog-routes/blogRoutes')
const categoryRoutes = require('./routes/category-routes/categoryRoutes')
const blogCategoryRoutes = require('./routes/blog-category-routes/blogCategoryRoutes')
const brandRoutes = require('./routes/brand-routes/brandRoutes')
const couponRoutes = require('./routes/coupon-routes/couponRoutes')

// Server port
const PORT = server_port || 8080

const app = express()

// Db Connection
dbConnection()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({  extended: true}))
app.use(cookParser()) 
app.use(cors());
app.use(morgan('tiny'))

// Middleware
app.use(errorHandler)

// Routes
app.use('/api/user', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/blog/category', blogCategoryRoutes)
app.use('/api/brand', brandRoutes)
app.use('/api/coupon', couponRoutes)

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`.white.bold)
}) 