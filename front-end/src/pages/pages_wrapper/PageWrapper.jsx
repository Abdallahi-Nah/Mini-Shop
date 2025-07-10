import React from "react";
import "./PageWrapper.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "../register/SignUp";
import Login from "../login/Login";
import Home from "../home/Home";
import Users from "../users/Users";
import Products from "../products/Products";
import Dashboard from "../dashboard/Dashboard";
import UpdateUser from "../update_user/UpdateUser";
import AddUser from "../add_user/AddUser";
import RequireAuth from "../auth/RequireAuth";
import PersistLogin from "../auth/PersistLogin";
import AddProduct from "../add_product/AddProduct";
import UpdateProduct from "../update_product/UpdateProduct";
import About from "../about/About";
import Contact from "../contact/Contact";

const PageWrapper = () => {
  return (
    <div className="side-pages">
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Route parent avec enfants */}
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="users/add-user" element={<AddUser />} />
              <Route
                path="users/update-user/:userId"
                element={<UpdateUser />}
              />
              <Route path="products" element={<Products />} />
              <Route path="products/add-product" element={<AddProduct />} />
              <Route
                path="products/update-product/:productId"
                element={<UpdateProduct />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default PageWrapper;
