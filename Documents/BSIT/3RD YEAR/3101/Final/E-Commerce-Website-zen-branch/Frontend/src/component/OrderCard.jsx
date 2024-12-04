import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';



export default function OrderCard({order}){
    const [product, setProduct] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`http://localhost:3000/products/product/${order.product_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => setProduct(response.data.data))
        .catch(error => console.error(error));
    })


    return (
        <div className="card mb-4" style={{ width: '100%' }}>
            <Link to="/orderDetails" 
            state={{ order: order, product: product }}
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src="https://via.placeholder.com/150" className="card-img" alt="..." />
                </div>
                <div className="col-md-8 d-flex flex-column">
                    <div className="card-body flex-grow-1">
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
                </div>
            </div>
            </Link>
        </div>
    )
}