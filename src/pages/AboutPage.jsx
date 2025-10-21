import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="about-overlay"></div>
        <div className="about-hero-text">
          <h1>About Our Perfume Brand</h1>
          <p>Elegance, passion, and artistry in every scent.</p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Welcome to <strong>LuxeScents</strong> — where fragrance meets emotion.
            We believe perfume is more than a scent — it’s a story you wear.
            Founded with a passion for artistry and authenticity, we craft
            timeless fragrances that embody elegance and individuality.
          </p>

          <p>
            Each of our perfumes is designed using carefully sourced ingredients,
            blended by expert perfumers who understand the beauty of subtlety
            and sophistication. Our mission is to create scents that capture
            memories, emotions, and moments — leaving an unforgettable impression.
          </p>
        </div>
        <div className="about-image">
          <img
            src="https://marketplace.canva.com/EAGrbuyECbI/1/0/1280w/canva-gold-and-black-elegant-perfume-instagram-post-pAjkFbMUkeE.jpg"
            alt="Perfume Bottles"
          />
        </div>
      </section>

      <section className="about-vision">
        <div className="vision-item">
          <img
            src="https://images.stockcake.com/public/9/8/f/98fcf0d7-9a16-4673-ab96-8ad3d1343b1c_medium/luxe-green-beauty-stockcake.jpg"
            alt="Luxury Perfume Design"
          />
          <h3>Luxury Meets Simplicity</h3>
          <p>
            Our minimalist designs reflect sophistication. Every bottle is a
            symbol of beauty, crafted to be both timeless and modern.
          </p>
        </div>
        <div className="vision-item">
          <img
            src="https://m.media-amazon.com/images/I/71E5rpihlyL._SL1500_.jpg"
            alt="Natural Ingredients"
          />
          <h3>Pure Ingredients</h3>
          <p>
            We value purity. Each fragrance is created with ethically sourced
            ingredients — capturing nature’s finest aromas with care.
          </p>
        </div>
        <div className="vision-item">
          <img
            src="https://inspiredbyscent.com/cdn/shop/files/THE_BEST-PERFECT-SPRAY-MIST-AUTOMIZER.jpg?v=1755040426"
            alt="Perfume Craftsmanship"
          />
          <h3>Crafted with Passion</h3>
          <p>
            From concept to creation, every scent is a work of art — born from
            passion, precision, and a deep love for fragrance.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
