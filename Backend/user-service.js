require('dotenv').config()
const express = require('express');
const app = express();
const https = require('https');
const path = require('path');
const fs = require('fs');

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app)

const jwt = require('jsonwebtoken');
const authenticateToken = require('../Backend/middlewares/authMiddleware');
const rateLimit = require('../Backend/middlewares/rateLimiterMiddleware');
const { validateLoginInput, validateUserProfileInput, validateUserUpdateInput, checkValidationResults} = require('../Backend/middlewares/inputValidation');
const authPage = require('../Backend/middlewares/rbacMiddleware');

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
const userSchema = new Schema({
    email: String,
    name: String,
    password: String,
    role: String,
})

const User = db.model('users', userSchema)


function generateAccessToken(user){
    const payload = {
        id: user.id,
        role: user.role
    };
    
    const token = jwt.sign(payload, 'cloudProject', { expiresIn: "1h" });

    return token;
}

app.post('/login', validateLoginInput, checkValidationResults, rateLimit, async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(403).json({
            error: "no user found",
        });
    }
    if(user.password !== password){
        return res.status(403).json({
            error: "incorrect password",
        });
    }

    delete user.password;

    const token = generateAccessToken(user);
    res.cookie("token", token, {
        httpOnly: true,
    });

    return res.status(200).json({
        message: "Login successful",
        role: user.role,
        token: token
    })
})


app.post('/register', validateUserProfileInput, checkValidationResults, rateLimit, async (req, res) => {
    const userObj = new User({ 
        email: req.body.email, 
        name: req.body.name, 
        password: req.body.password, 
        role: req.body.role, 
    });
    try {
        const user = await userObj.save();
        return res.status(200).json({
            message: "User registered successfully",
            data: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        })
    }
})

app.get('/all', authenticateToken, authPage(["admin"]), rateLimit, async (req, res) => {
    const users = await User.find();
    if(users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
    } else {
        return res.status(200).json({data: users});
    }
});

app.get('/user/:id', authenticateToken, authPage(["admin", "seller"]), rateLimit, async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    } else {
        return res.status(200).json({data: user});
    }
})

app.put('/user/:id', authenticateToken, validateUserUpdateInput, authPage(["admin"]), checkValidationResults, rateLimit, async (req, res) => {
    const userObj = {
        email: req.body.email, 
        name: req.body.name, 
        password: req.body.password
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, userObj, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: "User updated successfully", data: user });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating user', error: error.message });
    }
})

app.delete('/user/:id', authenticateToken, rateLimit, authPage(["admin"]), async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: "User deleted successfully", data: user });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
})






sslServer.listen(3001, () => {
    console.log('Server is running on port 3001');
});