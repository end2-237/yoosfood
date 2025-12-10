// Ce fichier est généré automatiquement
import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../pages/About/index.jsx";
import AdminDasboard from "../pages/AdminDasboard/index.jsx";
import Discover from "../pages/Discover/index.jsx";
import Home from "../pages/Home/index.jsx";
import OrderManager from "../pages/OrderManager/index.jsx";
import ProductsDetails from "../pages/ProductsDetails/index.jsx";
import ProductsManage from "../pages/ProductsManage/index.jsx";
import ReviewManager from "../pages/ReviewManager/index.jsx";

export default function AppRoutes() {
  return (
    <Routes>
  <Route path="/about" element={<About />} />
  <Route path="/admindasboard" element={<AdminDasboard />} />
  <Route path="/discover" element={<Discover />} />
  <Route path="/home" element={<Home />} />
  <Route path="/ordermanager" element={<OrderManager />} />
  <Route path="/productsdetails" element={<ProductsDetails />} />
  <Route path="/productsmanage" element={<ProductsManage />} />
  <Route path="/reviewmanager" element={<ReviewManager />} />
    </Routes>
  );
}
