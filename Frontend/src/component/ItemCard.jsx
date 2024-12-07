import {Link} from 'react-router-dom';
import itemDetails from '../pages/ItemDetails';

export default function ItemCard({item}){
    const itemUrl = item.photo ? `http://localhost:3002${item.photo}` : '/placeholder.jpg';
    console.log(item)
    return (
        <div className="card mb-4" style={{ width: '100%' }}>
            <Link
                to="/itemDetails"
                state={{ item }} // Pass the item object here
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={itemUrl} className="card-img" alt="Item" />
                    </div>
                    <div className="col-md-8 d-flex flex-column">
                        <div className="card-body flex-grow-1">
                            <h5 className="card-title">Name: {item.name}</h5>
                            <p className="card-text">Price: {item.price}</p>
                            <p className="card-text">Quantity: {item.quantity}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}