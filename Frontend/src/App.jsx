import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerHome from './pages/CustomerHome';
import CustomerOrders from './pages/CustomerOrders';
import ItemDetails from './pages/ItemDetails';
import OrderDetails from './pages/OrderDetails';
import SellerSent from './pages/SellerSent';
import SellerItem from './pages/SellerItem';
import SellerHome from './pages/SellerHome';
import SellerOrderDetails from './pages/SellerOrderDetails';
import SellerItemDetails from './pages/SellerItemDetails';
import SellerSentDetails from './pages/SellerSentDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  // Get user from localStorage if it exists, otherwise default to null
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    // Whenever the user state changes, save it to localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user'); // If no user, remove it from localStorage
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customerhome" element={<CustomerHome />} />
        <Route path="/customerorders" element={<CustomerOrders/>} />
        <Route path="/itemDetails" element={<ItemDetails />} />
        <Route path="/orderDetails" element={<OrderDetails />} />
        <Route path="/sellerSent" element={<SellerSent/>} />
        <Route path="/sellerItem" element={<SellerItem/>} />
        <Route path="/sellerHome" element={<SellerHome/>} />
        <Route path="/sellerOrderDetails" element={<SellerOrderDetails />} />
        <Route path="/sellerItemDetails" element={<SellerItemDetails />} />
        <Route path="/sellerSentDetails" element={<SellerSentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
