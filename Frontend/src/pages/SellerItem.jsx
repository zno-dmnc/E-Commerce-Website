
import SellerHeader from "../component/SellerHeader"
import SellerItemCard from "../component/SellerItemCard"
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';



export default function SellerSent({user}) {
    const token = localStorage.getItem('token');
    const [show, setShow] = useState(false);
    const [itemList, setItemList] = useState([]);
    const [values, setValues] = useState({
        name: '',
        price: '',
        quantity: '',
        seller_id: user._id 
    });

    const handleInput = (e) => {
        setValues(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddItem = async (e) => {
        // Handle the item addition logic here
        e.preventDefault()

        try {
            console.log(values);
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            const response = await axios.post('http://localhost:3000/products/add-product', values, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the request headers
                }
            });
            console.log(response);
            if(response.status === 200) {
                console.log(response.data)
                alert('Item added successfully');
            }
        }
        catch(e) {
            console.log(e)
            console.log('CANNOT ADD ITEM.', e);
            alert('CANNOT ADD ITEM!');
        }

        handleClose();
    };


    useEffect(() => {
        axios.get(`http://localhost:3000/products/seller-products/${user._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {setItemList(response.data.data) 
            console.log(response.data)})
        .catch(error => console.error(error));

    }, []);
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
                                    name="name"
                                    value={values.name}
                                    onChange={handleInput}
                                />
                            </Form.Group>
                            <Form.Group controlId="formItemPrice" className="mt-3">
                                <Form.Label>Item Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter item price"
                                    name="price"
                                    value={values.price}
                                    onChange={handleInput}
                                />
                            </Form.Group>
                            <Form.Group controlId="formItemQuantity" className="mt-3">
                                <Form.Label>Item Quantity</Form.Label>
                                <Form.Control
                                    type="Number"
                                    placeholder="Enter item quantity"
                                    name="quantity"
                                    value={values.quantity}
                                    onChange={handleInput}
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
                    {itemList.length > 0 ? (
                        itemList.map((item) => (
                            <div className="col-4" key={item._id}>
                                <SellerItemCard item={item} />
                            </div>
                        ))
                    ) : (
                        <p>No items available</p>
                    )}
                </div>
            </div>

        </div>
    )


}
