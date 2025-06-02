import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import Home from './scenes/home/Home.jsx';
import ItemDetails from './scenes/itemDetails/ItemDetails.jsx';
import Checkout from './scenes/checkout/Checkout.jsx';
import Success from './scenes/checkout/Success.jsx';
import Payment from './scenes/checkout/Payment.jsx';
import Navbar from './scenes/global/Navbar.jsx';
import CartMenu from './scenes/global/CartMenu.jsx';
import Footer from './scenes/global/Footer.jsx';

import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemID" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Success />} />
          <Route path="payment" element={<Payment />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}
