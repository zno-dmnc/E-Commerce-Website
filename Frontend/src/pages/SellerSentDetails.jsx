import Header1 from "../component/Header1"
import { useLocation } from 'react-router-dom';

export default function SellerSentDetails() {


    const location = useLocation();
    const { item, product, user } = location.state || {};
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
                            <h2>{product.name}</h2>
                                {/* <h4>Order ID: {item._id} </h4> */}
                                <p>Item Price: {product.price}</p>
                                {/* <p className="card-text">Customer ID: {item.customer_id}</p> */}
                                <p className="card-text">Customer Name: {user.name}</p>
                                <p className="card-text">
                                    Order Status: <span className={item.status === 'sent' ? 'text-success' : item.status === 'cancelled' ? 'text-danger' : ''}>
                                        {item.status}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}
