import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import "./HomePage.css";

const Home = ({ products, loading, favorites, toggleFavorite, addToCart }) => {
  if (loading) return <div className="homepage">Loading products...</div>;

  return (
    <div className="homepage">
      <h1 className="homepage-title">Our Signature Collection</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="image-container">
              <img
                src={product.ImageURL}
                alt={product.name}
                className="product-image"
              />
              <button
                onClick={() => toggleFavorite(product._id)}
                className="favorite-btn"
              >
                <Heart size={20} />
              </button>
            </div>

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">R{product.Price}</p>

              <button
                onClick={() => addToCart(product)}
                className="add-to-cart-btn"
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;