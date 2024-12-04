require('dotenv').config()
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const https = require('https');
const path = require('path');
const fs = require('fs');

const authenticateToken = require('../Backend/middlewares/authMiddleware');
const rateLimit = require('../Backend/middlewares/rateLimiterMiddleware');
const authPage = require('../Backend/middlewares/rbacMiddleware');
const { validateNewOrdersInput, validateEditOrdersInput, validateChangeOrderStatusInput, checkValidationResults} = require ('../Backend/middlewares/inputValidation');

// const sslServer = https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
// }, app)

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

const orderSchema = new Schema({
    customer_id: String,
    product_id: String,
    quantity: Number,
    status: String,
})


const productSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number,
    seller_id: String,
})

const Product = db.model('products', productSchema)


const Order = db.model('orders', orderSchema)

async function getCustomerById(customerId, req) {
    try {
        console.log(customerId)
        const token = req.headers.authorization;
        const response = await axios.get(`http://localhost:3000/users/user/${customerId}`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data.data;
    } catch(error) {
        console.log(error)
        throw new Error('Error getting customer');
    }
}

async function getProductById(productId, req) {
    try {
        const token = req.headers.authorization;
        const response = await axios.get(`http://localhost:3002/product/${productId}`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data.data;
    } catch(error) {
        console.error(error)
        throw new Error('Error getting product');
    }
}

async function removeProductQuantity(productId, quantity, req) {
    try {
        const token = req.headers.authorization;
        const response = await axios.put(`http://localhost:3002/update-quantity/${productId}`, 
            { quantity }, 
            { headers: { Authorization: token } }
        );
        
        return response.data.data;
    } catch(error) {
        console.error(error)
        throw new Error('Error updating product quantity');
    }
}

async function addProductQuantity(productId, quantity, req) {
    try {
        const token = req.headers.authorization;
        const response = await axios.put(`http://localhost:3002/add-quantity/${productId}`, 
            { quantity }, 
            { headers: { Authorization: token } }
        );
        
        return response.data.data;
    } catch(error) {
        console.error(error)
        throw new Error('Error adding product quantity');
    }
}


app.post('/add-order', authenticateToken, authPage(["admin", "customer"]), validateNewOrdersInput, checkValidationResults, async (req, res) => {
    const orderObj = new Order({ 
        customer_id: req.body.customer_id, 
        product_id: req.body.product_id, 
        quantity: req.body.quantity,
        status: 'pending',
    });
    try {
        const customer = await getCustomerById(req.body.customer_id, req);
        const product = await getProductById(req.body.product_id, req);
        if(product.quantity < req.body.quantity) {
            return res.status(400).json({
                error: 'Not enough product in stock',
            });
        }
        const updatedProduct = await removeProductQuantity(req.body.product_id, req.body.quantity, req);
        const order = await orderObj.save();
        return res.status(201).json({
            message: 'Order added successfully',
            data: order,
        });
    }catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
})

app.get('/all', authenticateToken, rateLimit, authPage(["admin"]),async (req, res) => {
    const orders = await Order.find();
    if(orders.length === 0) {
        return res.status(404).json({message: 'No orders found'});
    }
    return res.status(200).json({data: orders});
})

app.get('/customer-orders/:id', authenticateToken,async (req, res) => {
    const customer = req.params.id;
    const orders = await Order.find({ customer_id: customer });
    if(orders.length === 0) {
        return res.status(404).json({message: 'No orders found'});
    }
    return res.status(200).json({data: orders});
})

app.get('/seller-orders/:id', authenticateToken, authPage(["admin", "seller"]),async (req, res) => {
    const seller = req.params.id;
    const products = await Product.find({ seller_id: seller });
    const orders = await Order.find({ product_id: { $in: products.map(product => product._id) } });
    if(orders.length === 0) {
        return res.status(404).json({message: 'No orders found'});
    }
    return res.status(200).json({data: orders});
})

app.get('/order/:id', authenticateToken, rateLimit, authPage(["admin", "customer", "seller"]),async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order) {
        return res.status(404).json({message: 'Order not found'});
    }
    return res.status(200).json({data: order});
})

app.put('/change-order/:id', authenticateToken, rateLimit, authPage(["admin", "customer"]), validateEditOrdersInput, checkValidationResults, async (req, res) => {
    const orderObj = {
        product_id: req.body.product_id, 
        quantity: req.body.quantity
    }
    try {
        const order = await Order.findById(req.params.id);
        if(!order) {
            return res.status(404).json({
                error: 'Order not found',
            });
        }
        if(order.product_id === req.body.product_id) {
            const product = await getProductById(req.body.product_id, req);
            if(product.quantity < req.body.quantity - order.quantity) {
                return res.status(400).json({
                    error: 'Not enough product in stock',
                });
            }
            
            const updatedProduct = await removeProductQuantity(req.body.product_id, req.body.quantity - order.quantity, req);

            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { quantity: req.body.quantity}, { new: true });
            return res.status(200).json({
                message: 'Order updated successfully',
                data: updatedOrder,
            });
        }
        const product = await getProductById(req.body.product_id, req);
        if(product.quantity < req.body.quantity) {
            return res.status(400).json({
                error: 'Not enough product in stock',
            });
        }else{
            await addProductQuantity(order.product_id, order.quantity, req);
            const updatedProduct = await removeProductQuantity(req.body.product_id, req.body.quantity, req);
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, orderObj, { new: true });
            return res.status(200).json({
                message: 'Order updated successfully',
                data: updatedOrder,
            });
        }
    } catch (error) {
        return res.status(400).json({
            error: 'Error updating order',
        });
    }
})

app.put('/update-order-status/:id', authenticateToken, rateLimit, authPage(["admin", "seller"]), validateChangeOrderStatusInput, checkValidationResults, async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, {status: req.body.status}, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json({ message: "Order status updated successfully", data: order });
    } catch (error) {
        return res.status(400).json({
            error: 'Error updating order status',
        });
    }
})



app.delete('/delete-order/:id', authenticateToken, rateLimit, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order) {
        return res.status(404).json({message: 'Order not found'});
    }
    await addProductQuantity(order.product_id, order.quantity, req);
    await Order.findByIdAndDelete(req.params.id);
    return res.status(200).json({message: 'Order deleted successfully'});
})

app.listen(3003, () => {
    console.log('Order service listening on port 3003');
})