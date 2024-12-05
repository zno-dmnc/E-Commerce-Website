import { NavLink, useLocation } from 'react-router-dom';

const SellerHeader = () => {
    const handleLogout = () => {
        // Handle logout logic here
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirect to login page
    };

    const location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#FD7755", height: '70px', alignItems: 'center' }}>
            <div className="container d-flex justify-content-center" style={{ alignItems: 'center' }}>
                
                <NavLink to="/selleritem" className="btn btn-outline-light me-2" style={{ borderBottom: location.pathname === '/selleritem' ? '2px solid black' : 'none' }}>
                    <img src="/assets/package.svg" alt="Seller Item" />
                </NavLink>
                <NavLink to="/sellerhome" className="btn btn-outline-light me-2" style={{ borderBottom: location.pathname === '/sellerhome' ? '2px solid black' : 'none' }}>
                    <img src="/assets/house.svg" alt="Seller Home" />
                </NavLink>
                <NavLink to="/sellersent" className="btn btn-outline-light" style={{ borderBottom: location.pathname === '/sellersent' ? '2px solid black' : 'none' }}>
                    <img src="/assets/scroll.svg" alt="Seller Sent" />
                </NavLink>
            </div>
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default SellerHeader;