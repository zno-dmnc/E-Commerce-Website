import { useState, useEffect } from "react";
import SellerHeader from "../component/SellerHeader";
import SellerOrderCard from "../component/SellerOrderCard"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SellerHome({user}){
    const [itemList, setItemList] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/orders/seller-orders/${user._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => setItemList(response.data.data))
        .catch(error => console.error(error));
    }, [token]);

    return (
        <div>
            <SellerHeader />
            <div className="container">
                <div className="row">
                    {itemList.map((item) => (
                        (item.status === "pending") ? (
                        <div className="col-4" key={item._id}>
                            <SellerOrderCard item={item}
                            
                            />
                        </div>) : (console.log("No Pending Orders"))
                    ))}
                </div>
            </div>
        </div>
    )


}