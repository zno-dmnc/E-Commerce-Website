
import React, { useState } from 'react';

import Header1 from "../component/Header1"
import { Modal, Button, Form } from 'react-bootstrap';

export default function SellerItemDetails() {
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDescription, setItemDescription] = useState('');

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const handleUpdateItem = () => {
        // Handle the item update logic here
        console.log('Item Updated:', { itemName, itemPrice, itemDescription });
        handleCloseUpdate();
    };

    const handleDeleteItem = () => {
        // Handle the item deletion logic here
        console.log('Item Deleted');
        handleCloseDelete();
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
                                <button className="btn btn-primary" onClick={handleShowUpdate}>Update Item</button>
                                <button className="btn btn-danger ms-2" onClick={handleShowDelete}>Remove Item</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <Modal show={showUpdate} onHide={handleCloseUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formUpdateItemName">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter updated item name"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formUpdateItemPrice" className="mt-3">
                                <Form.Label>Item Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter updated item price"
                                    value={itemPrice}
                                    onChange={(e) => setItemPrice(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formUpdateItemDescription" className="mt-3">
                                <Form.Label>Item Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter updated item description"
                                    value={itemDescription}
                                    onChange={(e) => setItemDescription(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdate}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdateItem}>
                            Update Item
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this item?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDeleteItem}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
    </div>
    )
}
