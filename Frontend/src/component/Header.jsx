
import { NavLink , useLocation } from 'react-router-dom';

const Header = () => {
    const handleLogout = () => {
        // Handle logout logic here
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirect to login page
    };

    const location = useLocation();
    return (  
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#FD7755", height: '70px', alignItems: 'center' }}>
            <div className="container d-flex justify-content-center" style={{ alignItems: 'center' }}>
                <NavLink to="/customerHome" className="btn btn-outline-light me-2" style={{ borderBottom: location.pathname === '/customerHome' ? '2px solid black' : 'none' }}>
                    <img src="/assets/house.svg" alt="Customer Home" />
                </NavLink>
                <NavLink to="/customerorders" className="btn btn-outline-light" style={{ borderBottom: location.pathname === '/orders' ? '2px solid black' : 'none' }}>
                    <img src="/assets/scroll.svg" alt="Orders" />
                </NavLink>
            </div>
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Header;