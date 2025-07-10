"use client";

import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { User } from "../../context/UserContext";
import axios from "axios";

const Home = () => {
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

  const productCards = products.map((product, index) => (
    <div key={product.id || index} className="product-card">
      <div className="card-image-container">
        <img
          src={product.image || "/placeholder.svg?height=250&width=250"}
          alt={product.title}
          className="card-image"
        />
        <div className="card-badge">#{index + 1}</div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-description">{product.description}</p>
      </div>
    </div>
  ));

  return (
    <div className="products-container">
      <div className="header-section">
        <div className="products-count">
          {products.length} product{products.length !== 1 ? "s" : ""} available
          {products.length !== 1 ? "s" : ""}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>Aucun produit disponible</h3>
          <p>Le catalogue est actuellement vide</p>
        </div>
      ) : (
        <div className="products-grid">{productCards}</div>
      )}
    </div>
  );
};

export default Home;
