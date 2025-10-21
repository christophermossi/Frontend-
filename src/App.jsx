import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import CollectionsPage from './pages/CollectionsPage'; // ✅ make sure filename matches exactly
import AboutPage from './pages/AboutPage'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', postalCode: ''
  });

  const backendUrl = 'https://backend-48ig.onrender.com';

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/Products`);
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch cart and map to product details
  useEffect(() => {
    if (userEmail) {
      const fetchCart = async () => {
        try {
          const res = await axios.get(`${backendUrl}/Cart`);
          const userCart = res.data.filter(item => item.email === userEmail);

          const enrichedCart = await Promise.all(userCart.map(async (cartItem) => {
            const product = products.find(p => p._id.toString() === cartItem.productId.toString());
            if (!product) {
              console.error(`Product not found for cartItem productId: ${cartItem.productId}`);
              return {
                id: cartItem._id.toString(),
                name: 'Unknown Product',
                price: 0,
                image: '',
                description: '',
                quantity: cartItem.Quantity || 1
              };
            }
            return {
              id: cartItem._id.toString(),
              name: product.name || 'Unknown Product',
              price: product.Price ?? 0,
              image: product.ImageURL || '',
              description: product.Description || '',
              quantity: cartItem.Quantity || 1
            };
          }));
          setCart(enrichedCart);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };
      fetchCart();
    } else {
      setCart([]);
    }
  }, [userEmail, products]);

  const addToCart = async (product) => {
    if (!userEmail) {
      setShowLogin(true);
      return;
    }

    const existing = cart.find(item => item.id === product._id.toString());
    const newQuantity = existing ? existing.quantity + 1 : 1;

    try {
      if (existing) {
        const res = await axios.get(`${backendUrl}/Cart`);
        const itemToUpdate = res.data.find(i => i._id === existing.id);
        if (itemToUpdate) {
          await axios.put(`${backendUrl}/Cart/${itemToUpdate._id}`, { Quantity: newQuantity });
        }
      } else {
        await axios.post(`${backendUrl}/Cart`, {
          email: userEmail,
          productId: product._id,
          Quantity: 1
        });
      }

      const res = await axios.get(`${backendUrl}/Cart`);
      const userCart = res.data.filter(item => item.email === userEmail);
      const enrichedCart = await Promise.all(userCart.map(async (cartItem) => {
        const product = products.find(p => p._id.toString() === cartItem.productId.toString());
        if (!product) {
          console.error(`Product not found for cartItem productId: ${cartItem.productId}`);
          return {
            id: cartItem._id.toString(),
            name: 'Unknown Product',
            price: 0,
            image: '',
            description: '',
            quantity: cartItem.Quantity || 1
          };
        }
        return {
          id: cartItem._id.toString(),
          name: product.name || 'Unknown Product',
          price: product.Price ?? 0,
          image: product.ImageURL || '',
          description: product.Description || '',
          quantity: cartItem.Quantity || 1
        };
      }));
      setCart(enrichedCart);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.get(`${backendUrl}/Cart`);
      const itemToDelete = res.data.find(i => i._id === productId);
      if (itemToDelete) {
        await axios.delete(`${backendUrl}/Cart/${productId}`);
      }

      const resUpdated = await axios.get(`${backendUrl}/Cart`);
      const userCart = resUpdated.data.filter(item => item.email === userEmail);
      const enrichedCart = await Promise.all(userCart.map(async (cartItem) => {
        const product = products.find(p => p._id.toString() === cartItem.productId.toString());
        if (!product) {
          console.error(`Product not found for cartItem productId: ${cartItem.productId}`);
          return {
            id: cartItem._id.toString(),
            name: 'Unknown Product',
            price: 0,
            image: '',
            description: '',
            quantity: cartItem.Quantity || 1
          };
        }
        return {
          id: cartItem._id.toString(),
          name: product.name || 'Unknown Product',
          price: product.Price ?? 0,
          image: product.ImageURL || '',
          description: product.Description || '',
          quantity: cartItem.Quantity || 1
        };
      }));
      setCart(enrichedCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId, change) => {
    const newQuantity = cart.find(item => item.id === productId).quantity + change;
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      const res = await axios.get(`${backendUrl}/Cart`);
      const itemToUpdate = res.data.find(i => i._id === productId);
      if (itemToUpdate) {
        await axios.put(`${backendUrl}/Cart/${productId}`, { Quantity: newQuantity });
      }

      const resUpdated = await axios.get(`${backendUrl}/Cart`);
      const userCart = resUpdated.data.filter(item => item.email === userEmail);
      const enrichedCart = await Promise.all(userCart.map(async (cartItem) => {
        const product = products.find(p => p._id.toString() === cartItem.productId.toString());
        if (!product) {
          console.error(`Product not found for cartItem productId: ${cartItem.productId}`);
          return {
            id: cartItem._id.toString(),
            name: 'Unknown Product',
            price: 0,
            image: '',
            description: '',
            quantity: cartItem.Quantity || 1
          };
        }
        return {
          id: cartItem._id.toString(),
          name: product.name || 'Unknown Product',
          price: product.Price ?? 0,
          image: product.ImageURL || '',
          description: product.Description || '',
          quantity: cartItem.Quantity || 1
        };
      }));
      setCart(enrichedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    if (!userEmail) {
      setShowLogin(true);
      return;
    }

    try {
      await axios.post(`${backendUrl}/Order`, {
        email: userEmail,
        items: cart,
        totalCost: cartTotal + (cartTotal > 100 ? 0 : 10),
        shippingAddress: shippingInfo
      });

      const res = await axios.get(`${backendUrl}/Cart`);
      const userCartItems = res.data.filter(i => i.email === userEmail);
      for (const item of userCartItems) {
        await axios.delete(`${backendUrl}/Cart/${item._id}`);
      }

      setOrderComplete(true);
      setTimeout(() => {
        setCart([]);
        setOrderComplete(false);
        setCurrentPage('home');
      }, 3000);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };

  const handleLogout = () => {
    setUserEmail(null);
    localStorage.removeItem('userEmail');
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        setCurrentPage={setCurrentPage}
        cartCount={cartCount}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        userEmail={userEmail}
        onLogout={handleLogout}
        onOpenLogin={() => setShowLogin(true)}
      />

      {currentPage === 'home' && (
        <HomePage 
          products={products}
          loading={loadingProducts}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          addToCart={addToCart}
        />
      )}

      {currentPage === 'collections' && <CollectionsPage />} {/* ✅ Correctly placed */}
      {currentPage === "about" && <AboutPage />}


      {currentPage === 'cart' && (
        <CartPage 
          cart={cart}
          setCurrentPage={setCurrentPage}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          cartTotal={cartTotal}
        />
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage 
          cart={cart}
          cartTotal={cartTotal}
          orderComplete={orderComplete}
          handleCheckout={handleCheckout}
          shippingInfo={shippingInfo}
          setShippingInfo={setShippingInfo}
        />
      )}

      <Footer />
      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        setCurrentPage={setCurrentPage}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;
