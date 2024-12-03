import {Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

export default function SellerOrderCard({item}){
    const [product, setProduct] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`http://localhost:3000/products/product/${item.product_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => setProduct(response.data.data))
        .catch(error => console.error(error));
    }, [])

    const [user, setUser] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:3000/users/user/${item.customer_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => setUser(response.data.data))
        .catch(error => console.error(error));
    }, [])


    return (
        <div className="card mb-4" style={{ width: '100%' }}>
            <Link to="/sellerOrderDetails" 
            state={{ item, product, user }}
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src="https://via.placeholder.com/150" className="card-img" alt="..." />
                </div>
                <div className="col-md-8 d-flex flex-column">
                    <div className="card-body flex-grow-1">
                        <h5 className="card-title">Item Name: {product.name}</h5>
                        <p className="card-text">Item Price: {product.price}</p>
                        <p className="card-text">Order ID: {item.name} </p>
                        <p className="card-text">Customer ID: {item.customer_id}</p>
                        <p className="card-text">Customer Name: {user.name}</p>
                        <p className="card-text">Order Status: {item.status}</p>
                    </div>
                </div>
            </div>
            </Link>
        </div>
    )
}