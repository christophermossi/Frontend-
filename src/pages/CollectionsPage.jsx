import React from "react";
import "./CollectionsPage.css";

const CollectionsPage = () => {
  const perfumes = [
    {
      id: 1,
      name: "Élégance Intense",
      price: "R300.99",
      image: "https://cdn.briefly.co.za/images/1120/8a3ac6093a1662a6.jpeg?v=1",
    },
    {
      id: 2,
      name: "Creed Men",
      price: "R1 299.00",
      image: "https://www.myperfumeshop.com.au/cdn/shop/products/creed-royal-oud-edp-perfume-cologne-446096.png?v=1705003841&width=1065",
    },
    {
      id: 3,
      name: "Royal Oud",
      price: "R2 000.00",
      image: "https://tssoud.com/cdn/shop/files/EXTRAIT_DE_PARFUM_-_ROYAL_OUD747418.02.24.jpg?v=1749931519&width=1946",
    },
    {
      id: 4,
      name: "Rose Divine",
      price: "R1 500.00",
      image: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/2024/AUGUST/27/dNzN7hQq_19cc02d24af34bcba0ac3ea6576d3ad7.jpg",
    },
     {
      id: 1,
      name: "Royal Arab",
      price: "R3 000.00",
      image: "https://arabianaroma.in/cdn/shop/files/royaloud.jpg?v=1748085453&width=2000",
    },
    {
      id: 2,
      name: "Dylan Blue Versace",
      price: "R2 299.00",
      image: "https://shop.inspiredfrenchperfume.co.za/wp-content/uploads/2024/04/Jenna-Catalogue-2.jpg",
    },
    {
      id: 3,
      name: "Eros Versace",
      price: "R4 500.00",
      image: "https://distcdn.nicehair.dk/products/119370/versace-eros-najim-parfum-100-ml-1753700341.webp",
    },
    {
      id: 4,
      name: "Turquoise Pour Femme",
      price: "R1 500.00",
      image: "https://www.myperfumeshop.com.au/cdn/shop/files/61ERD9yRKYL.jpg?v=1708330107&width=2000",
    },
  ];

  return (
    <div className="collections-page">
      <h1 className="collections-title">Our Collection</h1>
      <p className="collections-subtitle">Discover our range of luxurious fragrances</p>

      <div className="collections-grid">
        {perfumes.map((perfume) => (
          <div key={perfume.id} className="perfume-card">
            <div className="perfume-image">
              <img src={perfume.image} alt={perfume.name} />
            </div>
            <div className="perfume-info">
              <h2>{perfume.name}</h2>
              <p>{perfume.price}</p>
              <button className="shop-btn">Shop Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;
