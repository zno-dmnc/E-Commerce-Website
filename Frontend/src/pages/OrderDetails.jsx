import React, { useState } from 'react';
import Header1 from "../component/Header1";
import { Modal, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function OrderDetails(){
    const [showCancel, setShowCancel] = useState(false);

    const handleCloseCancel = () => setShowCancel(false);
    const handleShowCancel = () => setShowCancel(true);

    const location = useLocation();
    const { order, product } = location.state || {};
    const token = localStorage.getItem('token');


    const handleCancelOrder = async () => {
        // Handle the order cancellation logic here
        try{
            const response = await axios.delete(`http://localhost:3000/orders/delete-order/${order._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response);
            if(response.status === 200){
                alert('Order Cancelled');
            }

        }catch(e){
            console.log(e)
            console.log('Error cancelling order');
        }
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
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Quantity: {order.quantity}</p>
                                <p className="card-text">
                                    Order Status: <span className={
                                        order.status === 'sent' ? 'text-success' :
                                        order.status === 'cancelled' ? 'text-danger' :
                                        order.status === 'pending' ? 'text-secondary' : ''
                                    }>
                                        {order.status}
                            </span>
                        </p>
                            </div>

                                <div className="d-flex justify-content-end">
                                    {order.status !== 'sent' && order.status !== 'cancelled' &&(
                                                <button className="btn btn-danger" onClick={handleShowCancel}>Cancel Order</button>
                                            )}
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