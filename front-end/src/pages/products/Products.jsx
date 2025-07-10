"use client";

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import { User } from "../../context/UserContext";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const user = useContext(User);
  const token = user.auth.token;

  console.log(user.auth);
  console.log("Products State : ", products);

  const fetchProducts = async () => {
    try {
      const prds = await axios.get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("products : ", prds.data);
      setProducts(prds.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("product deleted", res);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const showProducts = products.map((product, index) => (
    <tr key={product.id || index}>
      <td className="id-cell">{index + 1}</td>
      <td className="image-cell">
        <div className="image-container">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="product-image"
          />
        </div>
      </td>
      <td className="title-cell">{product.title}</td>
      <td className="description-cell">{product.description}</td>
      <td className="actions-cell">
        <div className="actions-container">
          <Link
            to={`/dashboard/products/update-product/${product.id}`}
            className="update-btn"
          >
            Update
          </Link>
          <button
            onClick={() => deleteProduct(product.id)}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="products-container">
      <div className="header-section">
        <Link
          to={"/dashboard/products/add-product"}
          className="new-product-btn"
        >
          New Product
        </Link>
      </div>
      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th className="id-header">#ID</th>
              <th className="image-header">Image</th>
              <th className="title-header">Title</th>
              <th className="description-header">Description</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>{showProducts}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
