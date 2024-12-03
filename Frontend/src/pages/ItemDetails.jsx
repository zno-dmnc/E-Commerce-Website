import Header1 from "../component/Header1"
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ItemDetails(){
    const [showBuy, setShowBuy] = useState(false);

    const handleCloseBuy = () => setShowBuy(false);
    const handleShowBuy = () => setShowBuy(true);

    const handleBuyItem = () => {
        // Handle the item buying logic here
        console.log('Item Bought');
        handleCloseBuy();
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
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-success" onClick={handleShowBuy}>Buy Item</button>
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
                        Are you sure you want to buy this item?
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
    )
}