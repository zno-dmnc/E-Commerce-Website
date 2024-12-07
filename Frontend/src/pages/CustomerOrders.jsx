import OrderCard from "../component/OrderCard"
import Header from "../component/header"

import { useEffect, useState } from "react"
import axios from "axios"

export default function CustomerOrders(){
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        axios.get(`http://localhost:3000/orders/customer-orders/${user._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {setOrders(response.data.data)
        })
        .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <div className="row">
                    {orders.map((order) => (
                        <div className="col-md-6" key={order}>
                            <OrderCard order={order}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}