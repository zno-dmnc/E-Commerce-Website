//import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import CustomerHome from "./pages/CustomerHome";
import CustomerOrders from "./pages/CustomerOrders";
import ItemDetails from "./pages/ItemDetails";
import OrderDetails from "./pages/OrderDetails";
import SellerSent from "./pages/SellerSent";
import SellerItem from "./pages/SellerItem";
import SellerHome from "./pages/SellerHome";
import SellerOrderDetails from "./pages/SellerOrderDetails";
import SellerItemDetails from "./pages/SellerItemDetails";
import SellerSentDetails from "./pages/SellerSentDetails";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
 // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customerhome" element={<CustomerHome />} />
          <Route path="/customerorders" element={<CustomerOrders />} />
          <Route path="/itemDetails" element={<ItemDetails />} />
          <Route path="/orderDetails" element={<OrderDetails />} />
          <Route path="/sellerSent" element={<SellerSent />} />
          <Route path="/sellerItem" element={<SellerItem />} />
          <Route path="/sellerHome" element={<SellerHome />} />
          <Route path="/sellerOrderDetails" element={<SellerOrderDetails />} />
          <Route path="/sellerItemDetails" element={<SellerItemDetails />} />
          <Route path="/sellerSentDetails" element={<SellerSentDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
