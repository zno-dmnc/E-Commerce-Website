
import React, { useState } from 'react';

import Header1 from "../component/Header1"
import { Modal, Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from "axios";

export default function SellerItemDetails() {
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const { item } = useLocation().state || {};
    const token = localStorage.getItem('token');
    const [values, setValues] = useState({
        name: item.name,
        price: item.price,
        quantity: item.quantity
    });
    console.log(item);
    const handleInput = (e) => {
        setValues(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    


    console.log(values);




    const handleUpdateItem = async() => {
        try{
            console.log('values to be passed, ', values);
            const response = await axios.put(`http://localhost:3000/products/update-product/${item._id}`, values,
                {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                }
            });
            console.log(response);
            if(response.status === 200){
                alert('Item Updated Successfully');
            }
        }catch(e){
            console.log(e);
            console.log('CANNOT UPDATE ITEM.', e);
            alert('CANNOT UPDATE ITEM!');
        }



        handleCloseUpdate();
    };





    const handleDeleteItem = async() => {    
        try{
            const response = await axios.delete(`http://localhost:3000/products/delete-product/${item._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response);
            if(response.status === 200){
                alert('Item Deleted Successfully');
            }


        }catch(e){
            console.log(e);
            console.log('CANNOT DELETE ITEM.', e);
            alert('CANNOT DELETE ITEM!');
        }

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
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.price}</p>
                            <p className="card-text">{item.quantity}</p>
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
                                    placeholder={item.name}
                                    name="name"
                                    onChange={handleInput}
                                />
                            </Form.Group>
                            <Form.Group controlId="formUpdateItemPrice" className="mt-3">
                                <Form.Label>Item Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder={item.price}
                                    name="price"
                                    onChange={handleInput}
                                />
                            </Form.Group>
                            <Form.Group controlId="formUpdateItemDescription" className="mt-3">
                                <Form.Label>Item Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    rows={3}
                                    placeholder={item.quantity}
                                    name="quantity"
                                    onChange={handleInput}
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
