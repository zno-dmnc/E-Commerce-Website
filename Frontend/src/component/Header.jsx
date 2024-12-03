
import { NavLink , useLocation } from 'react-router-dom';

const Header = () => {

    const location = useLocation();
    return (  
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#FD7755", height: '70px', alignItems: 'center' }}>
            <div className="container d-flex justify-content-center" style={{ alignItems: 'center' }}>
                <NavLink to="/customerHome" className="btn btn-outline-light me-2" style={{ borderBottom: location.pathname === '/customerHome' ? '2px solid black' : 'none' }}>
                    <img src="https://via.placeholder.com/50" alt="Customer Home" />
                </NavLink>
                <NavLink to="/customerorders" className="btn btn-outline-light" style={{ borderBottom: location.pathname === '/orders' ? '2px solid black' : 'none' }}>
                    <img src="https://via.placeholder.com/50" alt="Orders" />
                </NavLink>
            </div>
        </nav>
    )
}

export default Header;