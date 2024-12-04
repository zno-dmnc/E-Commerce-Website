import React, { useState } from 'react';
import Header1 from "../component/Header1";
import { Modal, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function SellerOrderDetails() {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showCancel, setShowCancel] = useState(false);

    const location = useLocation();
    const { item, product, user } = location.state || {};

    const handleCloseConfirm = () => setShowConfirm(false);
    const handleShowConfirm = () => setShowConfirm(true);

    const handleCloseCancel = () => setShowCancel(false);
    const handleShowCancel = () => setShowCancel(true);

    const handleConfirmOrder = () => {
        // Handle the order confirmation logic here
        console.log('Order Confirmed');
        handleCloseConfirm();
    };

    const handleCancelOrder = () => {
        // Handle the order cancellation logic here
        console.log('Order Cancelled');
        handleCloseCancel();
    };

    return(
        <div>
        <Header1 />
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <img src="https://via.placeholder.com/500/FF0000/FFFFFF?text=Item+Image" alt="Item" className="img-fluid" />
                        </div>
                        <div className="col-md-6 d-flex flex-column justify-content-between">
                            <div>
                                <h2>Item Name: {product.name}</h2>
                                <h4>Order ID: {item._id} </h4>
                                <p>Item Price: {product.price}</p>
                                <p className="card-text">Customer ID: {item.customer_id}</p>
                                <p className="card-text">Customer Name: {user.name}</p>
                                <p className="card-text">Order Status: {item.status}</p>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-success" onClick={handleShowConfirm}>Confirm Order</button>
                                <button className="btn btn-danger" onClick={handleShowCancel}>Cancel Order</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showConfirm} onHide={handleCloseConfirm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to confirm this order?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseConfirm}>
                            Close
                        </Button>
                        <Button variant="success" onClick={handleConfirmOrder}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showCancel} onHide={handleCloseCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cancel Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to cancel this order?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCancel}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleCancelOrder}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    </div>
    )

}
