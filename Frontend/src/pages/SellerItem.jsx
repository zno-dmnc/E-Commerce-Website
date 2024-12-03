
import SellerHeader from "../component/SellerHeader"
import SellerItemCard from "../component/SellerItemCard"
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


export default function SellerSent() {
    const [show, setShow] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDescription, setItemDescription] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddItem = () => {
        // Handle the item addition logic here
        console.log('Item Added:', { itemName, itemPrice, itemDescription });
        handleClose();
    };
    const card = Array(12).fill(0);
    return (
        <div>
            <SellerHeader />
            <div className="container mt-4">
                <Button variant="primary" onClick={handleShow}>
                    ADD Item
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formItemName">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter item name"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formItemPrice" className="mt-3">
                                <Form.Label>Item Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter item price"
                                    value={itemPrice}
                                    onChange={(e) => setItemPrice(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formItemDescription" className="mt-3">
                                <Form.Label>Item Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter item description"
                                    value={itemDescription}
                                    onChange={(e) => setItemDescription(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAddItem}>
                            Add Item
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>






            <div className="container">
                <div className="row">
                    {card.map((_, index) => (
                        <div className="col-4" key={index}>
                            <SellerItemCard />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )


}
