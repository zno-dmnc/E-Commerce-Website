import {Link} from 'react-router-dom';


export default function SellerOrderCard(){

    return (
        <div className="card mb-4" style={{ width: '100%' }}>
            <Link to="/sellerOrderDetails" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src="https://via.placeholder.com/150" className="card-img" alt="..." />
                </div>
                <div className="col-md-8 d-flex flex-column">
                    <div className="card-body flex-grow-1">
                        <h5 className="card-title">Order Name</h5>
                        <p className="card-text">Order Price</p>
                        <p className="card-text">Order Status</p>
                    </div>
                </div>
            </div>
            </Link>
        </div>
    )
}