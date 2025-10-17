import React from "react";
import { Check } from "lucide-react";
import "./CheckoutPage.css";

const CheckoutPage = ({ cart, cartTotal, orderComplete, handleCheckout }) => {
  return (
     <div className="checkout-container">
      <div className="checkout-inner">
        {orderComplete ? (
          <div className="order-complete">
            <div className="order-icon">
              <Check size={40} className="check-icon" />
            </div>
            <h1>Order Complete!</h1>
            <p className="thank-text">Thank you for your purchase.</p>
            <p className="email-text">
              You will receive a confirmation email shortly.
            </p>
          </div>
        ) : (
          <>
            <h1 className="checkout-title">Checkout</h1>

            <div className="checkout-grid">
              {/* 🧾 Left Section */}
              <div className="checkout-details">
                {/* Shipping Info */}
                <div className="checkout-card">
                  <h2>Shipping Information</h2>
                  <div className="grid-two">
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                  </div>
                  <input type="email" placeholder="Email" />
                  <input type="tel" placeholder="Phone" />
                  <input type="text" placeholder="Address" />
                  <div className="grid-two">
                    <input type="text" placeholder="City" />
                    <input type="text" placeholder="Postal Code" />
                  </div>
                </div>

                {/* Payment Info */}
                <div className="checkout-card">
                  <h2>Payment Information</h2>
                  <input type="text" placeholder="Card Number" />
                  <div className="grid-two">
                    <input type="text" placeholder="MM/YY" />
                    <input type="text" placeholder="CVV" />
                  </div>
                </div>

                <button onClick={handleCheckout} className="complete-btn">
                  Complete Order
                </button>
              </div>

              {/* 🧮 Order Summary */}
              <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="summary-items">
                  {cart.map((item) => (
                    <div key={item.id} className="summary-item">
                      <span>
                        {item.name} ×{item.quantity}
                      </span>
                      <span>R{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="summary-totals">
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
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
