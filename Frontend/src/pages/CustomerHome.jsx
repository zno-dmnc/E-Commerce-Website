import Header from "../component/header"
import ItemCard from "../component/ItemCard"
import { useEffect, useState } from "react"
import axios from "axios"

export default function CustomerHome({user}){
    const [items, setItems] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`http://localhost:3000/products/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {setItems(response.data.data)
        })
        .catch(error => console.error(error));

    }, []);
    return(
        <div>
        <Header />
        <div className="container mt-4">
                <div className="row">
                    {items.map((item) => (
                        <div className="col-md-6" key={item._id}>
                            <ItemCard item={item}/>
                        </div>
                    ))}
                </div>
            </div>
    </div>
    )
}