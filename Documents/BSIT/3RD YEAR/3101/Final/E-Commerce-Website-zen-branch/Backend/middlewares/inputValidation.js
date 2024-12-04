const { body, validationResult } = require('express-validator');

const validateLoginInput = [
    body('email').notEmpty().withMessage('email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

const validateUserProfileInput = [
    body('name').notEmpty().withMessage('Username is required').trim().escape(),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address').trim().escape(),
    body('password').notEmpty().withMessage('Password is required').trim().escape(),
    body('role').isIn(['admin', 'customer', 'seller']).withMessage('User role must be either "admin", "customer", or "seller"').trim().escape(),
];

const validateUserUpdateInput = [
    body().custom((value, { req }) => {
        // Check if at least one of the expected fields is provided
        const { name, email, password } = req.body;
        if (!name && !email && !password) {
            throw new Error('At least one field (name, email, password) is required for updating the user');
        }
        return true; // If validation passes
    }),
    body('email').optional().isEmail().withMessage('Invalid email address').trim().escape(),
    body('name').optional().trim().escape(),
    body('password').optional().trim().escape(),
]

const validateProductInput = [
    body('name').notEmpty().withMessage('Product name is required').trim().escape(),
    body('price').notEmpty().withMessage('Product price is required').trim().escape(),
    body('price').isFloat().withMessage('Product price must be a number').trim().escape(),
    body('quantity').notEmpty().withMessage('Product quantity is required').trim().escape(),
    body('quantity').isInt().withMessage('Product quantity must be an integer').trim().escape(),
];

const validateProductEditInput = [
    body().custom((value, { req }) => {
        // Check if at least one of the expected fields is provided
        const { name, price, quantity } = req.body;
        if (!name && !price && !quantity) {
            throw new Error('At least one field (name, price, quantity) is required for updating the product');
        }
        return true; // If validation passes
    }),
    body('name').optional().trim().escape(),
    body('price').optional().isFloat().withMessage('Product price must be a number').trim().escape(),
    body('quantity').optional().trim().escape(),
    body('quantity').isInt().withMessage('Product quantity must be an integer').trim().escape(),
];

const validateProductQuantityInput = [
    body('quantity').notEmpty().withMessage('Product quantity is required').trim().escape(),
    body('quantity').isInt().withMessage('Product quantity must be an integer').trim().escape(),
]

const validateNewOrdersInput = [
    body('customer_id').notEmpty().withMessage('Customer ID is required').trim().escape(),
    body('product_id').notEmpty().withMessage('Product ID is required').trim().escape(),
    body('quantity').notEmpty().withMessage('Product Quantity is required').trim().escape(),
];

const validateEditOrdersInput = [
    body().custom((value, { req }) => {
        // Check if at least one of the expected fields is provided
        const { productId, quantity } = req.body;
        if (!productId && !quantity) {
            throw new Error('At least one field (customerId, productId, quantity) is required for updating the order');
        }
        return true; // If validation passes
    }),
    body('productId').optional().trim().escape(),
    body('quantity').optional().trim().escape(),
    body('quantity').isInt().withMessage('Product quantity must be an integer').trim().escape(),   
];

const validateChangeOrderStatusInput = [
    body('status').notEmpty().withMessage('Order status is required').trim().escape(),
    body('status').isIn(['pending', 'sent', 'cancelled']).withMessage('Order status must be either "pending", "sent", or "cancelled"').trim().escape(),
];


const checkValidationResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};



module.exports = {
    validateLoginInput,
    validateUserProfileInput,
    validateUserUpdateInput,
    validateProductInput,
    validateProductEditInput,
    validateProductQuantityInput,
    validateNewOrdersInput,
    validateEditOrdersInput,
    validateChangeOrderStatusInput,
    checkValidationResults,
};