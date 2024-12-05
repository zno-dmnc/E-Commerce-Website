import Header1 from "../component/Header1";
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function ItemDetails() {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const { item } = location.state || {}; // Get the passed item from state

    const itemUrl = item.photo ? `http://localhost:3002${item.photo}` : '/placeholder.jpg';
    const [showBuy, setShowBuy] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    const [purchase, setPurchase] = useState({
        customer_id: user._id,
        product_id: item._id,
        quantity: 1, // Default quantity
    });
    console.log(token)
    console.log(purchase)
    
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setPurchase(prev => ({ ...prev, quantity: value > 0 ? value : 1 })); // Ensure quantity is valid
    };
    
    

    const handleCloseBuy = () => setShowBuy(false);
    const handleShowBuy = () => setShowBuy(true);

    const handleBuyItem = async(e) => {
        e.preventDefault()

        try {
            console.log(purchase);
            const response = await axios.post('http://localhost:3000/orders/add-order', purchase, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the request headers
                }
            });
            console.log(response);
            alert('Order added successfully');

        }
        catch (e) {
            if (e.response && e.response.data) {
                console.error('Backend error:', e.response.data);
                alert(`Error: ${e.response.data.message || 'Unable to process request'}`);
            } else {
                console.error(e);
                alert('CANNOT ADD ORDER!');
            }
        }
        
        handleCloseBuy();
    };

    if (!item) {
        return <p>No item details available</p>;
    }

    return (
        <div>
            <Header1 />
            <div className="container mt-4">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <img
                                    src={itemUrl}
                                    alt="Item"
                                    className="img-fluid"
                                />
                            </div>
                            <div className="col-md-6 d-flex flex-column justify-content-between">
                                <div>
                                    <h2>{item.name}</h2>
                                    <h4>{item.price}</h4>
                                    <p>Available Quantity: {item.quantity}</p>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button
                                        className="btn btn-success"
                                        onClick={handleShowBuy}
                                    >
                                        Buy Item
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={showBuy} onHide={handleCloseBuy}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Purchase</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to buy this item?</p>
                        <Form.Group controlId="purchaseQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                name="quantity"
                                value={purchase.quantity || ""}
                                onChange={handleQuantityChange}
                                placeholder="Enter quantity"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseBuy}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={handleBuyItem}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
