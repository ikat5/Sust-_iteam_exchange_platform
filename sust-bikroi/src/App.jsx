import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail';
import SellPost from './pages/SellPost';
import CategoryPage from './pages/CategoryPage';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/sell" element={<SellPost />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path = "/categories" element = {<h1>has not built yet</h1>}/>
          <Route path = "/products" element = {<h1>has not built yet</h1>}/>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
