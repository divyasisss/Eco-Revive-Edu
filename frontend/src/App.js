import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/NavigationBar/NavigationBar';
import HomePage from './pages/HomePage';
import LoginPage from './components/Auth/Login'; // Import Login component
import RegisterPage from './components/Auth/Register'; // Import Register component
import LogoutPage from './components/Auth/Logout';
import SellerDashboard from './pages/SellerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import CartPage from './pages/CartPage';
import ProductList from './components/Products/Products';
import ProductDetail from './components/Products/ProductDetail';
import ProductForm from './components/Products/ProductForm';
import OrderList from './components/Orders/OrderList';
import OrderDetail from './components/Orders/OrderDetail';
import About from './components/About/About'
import ContactUs from './components/ContactUs/ContactUs';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Add the Header component here */}
        <div className="content"> {/* Wrap Routes in a content div */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/:orderId" element={<OrderDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
