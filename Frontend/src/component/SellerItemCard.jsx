import { Link } from 'react-router-dom';

export default function SellerItemCard({ item }) {
    const imageUrl = item.photo ? `http://localhost:3002${item.photo}` : '/placeholder.jpg';
    return (
        <div className="card mb-4" style={{ width: '100%' }}>
            <Link
                to="/sellerItemDetails"
                state={{ item }}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img
                            src={imageUrl}
                            className="card-img"
                            alt={item.name || 'Item'}
                            style={{ objectFit: 'cover', height: '100%' }}
                        />
                    </div>
                    <div className="col-md-8 d-flex flex-column">
                        <div className="card-body flex-grow-1">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">₱{item.price}</p>
                            <p className="card-text">Quantity: {item.quantity}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
