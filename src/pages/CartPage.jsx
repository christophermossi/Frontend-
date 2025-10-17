import React from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import "./CartPage.css";

const CartPage = ({
  cart,
  setCurrentPage,
  updateQuantity,
  removeFromCart,
  cartTotal,
}) => {
  return (
    <div className="cart-container">
      <div className="cart-inner">
        <h1 className="cart-title">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <ShoppingCart size={64} className="cart-empty-icon" />
            <h2>Your cart is empty</h2>
            <button
              onClick={() => setCurrentPage("home")}
              className="continue-btn"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-grid">
            {/* 🛒 LEFT SIDE — CART ITEMS */}
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image ? item.image : ''} // Use the image from product data
                    alt={item.name}
                    className="cart-item-image"
                    onError={(e) => { e.target.src = 'path/to/placeholder.jpg'; }} // Fallback image
                  />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p className="cart-item-price">R{item.price}</p>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 💳 RIGHT SIDE — ORDER SUMMARY */}
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>R{cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{cartTotal > 100 ? "Free" : "R10.00"}</span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>
                    R{(cartTotal + (cartTotal > 100 ? 0 : 10)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage("checkout")}
                className="checkout-btn"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => setCurrentPage("home")}
                className="continue-btn-outline"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;