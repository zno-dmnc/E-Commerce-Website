
import SellerHeader from "../component/SellerHeader"
import SellerSentCard from "../component/SellerSentCard"
import { useState, useEffect } from "react";
import axios from "axios";

export default function SellerSent({user}) {
    const [item, setItem] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`http://localhost:3000/orders/seller-orders/${user._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => setItem(response.data.data))
    }, [])

    return (
       <div>
            <SellerHeader />
            <div className="container">
                <div className="row">
                    {item.map((order) => (
                        (order.status === "sent" || order.status === "cancelled") ? (
                        <div className="col-4" key={order._id}>
                            <SellerSentCard item={order}/>
                        </div>) : (console.log("Not Sent"))
                    ))}
                </div>
       </div>
    </div>
        
    )


}