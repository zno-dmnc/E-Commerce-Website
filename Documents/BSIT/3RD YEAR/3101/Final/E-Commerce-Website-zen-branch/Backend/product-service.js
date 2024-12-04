require('dotenv').config()
const express = require('express');
const app = express();

const https = require('https');
const path = require('path');
const fs = require('fs');

const cors = require('cors');

// const sslServer = https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
// }, app)

const authenticateToken = require('../Backend/middlewares/authMiddleware');
const rateLimit = require('../Backend/middlewares/rateLimiterMiddleware');
const { validateProductInput, validateProductEditInput, validateProductQuantityInput, checkValidationResults} = require('../Backend/middlewares/inputValidation');
const authPage = require('../Backend/middlewares/rbacMiddleware');


app.use(cors({origin: '*', credentials: true}));
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Use the 'E-Commerce' database
const db = mongoose.connection.useDb('E-Commerce');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number,
    seller_id: String,
})

const Product = db.model('products', productSchema)


app.post('/add-product', authenticateToken, authPage(["admin", "seller"]), validateProductInput, checkValidationResults, async (req, res) => {
    const productObj = new Product({ 
        name: req.body.name, 
        price: req.body.price, 
        quantity: req.body.quantity,
        seller_id: req.body.seller_id,
    });
    try {
        const product = await Product.findOne({ name: req.body.name, seller_id: req.body.seller_id });
        if (product) {
            product.quantity += req.body.quantity;
            await Product.findByIdAndUpdate(product._id, { quantity: product.quantity }, { new: true });
            return res.status(200).json({
                message: "Product updated successfully",
                data: product,
            });
        } else {
            const item = await productObj.save();
            return res.status(201).json({
                message: "Product added successfully",
                data: item,
            });
        }
    }catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
})

app.get('/all', authenticateToken, authPage(["admin", "customer", "seller"]), async (req, res) => {
    const products = await Product.find();
    if(products.length === 0) {
        return res.status(404).json({message: 'No products found'});
    }
    return res.status(200).json({data: products});
})

app.get('/seller-products/:id', authenticateToken, authPage(["admin", "seller"]),async (req, res) => {
    const seller = req.params.id;
    const products = await Product.find({ seller_id: seller });
    if(products.length === 0) {
        return res.status(404).json({message: 'No products found'});
    }
    return res.status(200).json({data: products});
});

app.get('/product/:id', authenticateToken, async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return res.status(404).json({message: 'Product not found'});
    }
    return res.status(200).json({data: product});
})

app.put('/update-product/:id', authenticateToken, rateLimit, authPage(["admin", "seller"]), validateProductEditInput, checkValidationResults, async (req, res) => {
    const productObj = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
    }
    try {
        if(!req.body.name){
            delete productObj.name;
        }
        if(!req.body.price){
            delete productObj.price;
        }
        if(!req.body.quantity){
            delete productObj.quantity
        }
        const product = await Product.findByIdAndUpdate(req.params.id, productObj, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: "Product updated successfully", data: product });
    } catch (error) {
        return res.status(400).json({
            error: 'Error updating product',
        });
    }
})

app.put('/update-quantity/:id', authenticateToken, rateLimit, validateProductQuantityInput, checkValidationResults, async (req, res) => {
    const quantity = parseInt(req.body.quantity);
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        console.log(product.quantity);
        product.quantity -= quantity;
        console.log(product.quantity);
        await Product.findByIdAndUpdate(req.params.id, { quantity: product.quantity }, { new: true });
        return res.status(200).json({ message: "Product quantity updated successfully", data: product });
    } catch {
        return res.status(400).json({
            error: 'Error updating product quantity',
        });
    }
})

app.put('/add-quantity/:id', authenticateToken,validateProductQuantityInput, checkValidationResults, async (req, res) => {
    const quantity = parseInt(req.body.quantity);
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.quantity += quantity;
        await Product.findByIdAndUpdate(req.params.id, { quantity: product.quantity }, { new: true });
        return res.status(200).json({ message: "Product quantity updated successfully", data: product });
    } catch {
        return res.status(400).json({
            error: 'Error updating product quantity',
        });
    }
})

app.delete('/delete-product/:id', authenticateToken, rateLimit, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return res.status(400).json({
            error: 'Error deleting product',
        });
    }
})


app.listen(3002, () => {
    console.log('Server is running on port 3002');
});