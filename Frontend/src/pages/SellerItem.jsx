
import SellerHeader from "../component/SellerHeader"
import SellerItemCard from "../component/SellerItemCard"
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';



export default function SellerSent() {
    const token = localStorage.getItem('token');
    const [show, setShow] = useState(false);
    const [itemList, setItemList] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [values, setValues] = useState({
        name: '',
        price: '',
        quantity: '',
        seller_id: user._id ,
        photo: ''
    });

    const handleInput = (e) => {
        const { name, value, files } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: files ? files[0] : value, // If input is a file, store the file object; otherwise, store the value
        }));
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddItem = async (e) => {
        e.preventDefault();
    
        // Create a FormData object
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("quantity", values.quantity);
        formData.append("seller_id", values.seller_id);
    
        // Append the photo file
        if (values.photo) {
            formData.append("product", values.photo); // 'product' matches the field name in `upload.single('product')`
        }
    
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:3000/products/add-product",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Important for `form-data`
                        Authorization: `Bearer ${token}`, // Include the token
                    },
                }
            );
    
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                alert("Item added successfully");
            }
        } catch (error) {
            console.error("CANNOT ADD ITEM:", error.response?.data || error.message);
            alert("CANNOT ADD ITEM!");
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

    }, [itemList]);
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
                            <Form.Group controlId="formItemPhoto" className="mt-3">
                                <Form.Label>Item Photo</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="photo"
                                    onChange={handleInput} // Use the updated handleInput function
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
