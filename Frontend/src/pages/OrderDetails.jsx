import React, { useState } from 'react';
import Header1 from "../component/Header1";
import { Modal, Button } from 'react-bootstrap';

export default function OrderDetails(){
    const [showCancel, setShowCancel] = useState(false);

    const handleCloseCancel = () => setShowCancel(false);
    const handleShowCancel = () => setShowCancel(true);

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
                                <h2>Item Name</h2>
                                <h4>Item Price</h4>
                                <p>Item Description</p>
                                <p>Item Status</p>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-danger" onClick={handleShowCancel}>Cancel Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showCancel} onHide={handleCloseCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Cancellation</Modal.Title>
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