import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product_display.css';

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json')
      .then(response => {
        const data = response.data.products;

        // Converting  the object of products into an array
        const productsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));

        // Sorting the products based on popularity
        const sortedProducts = productsArray.sort((a, b) => b.popularity - a.popularity);

        setProducts(sortedProducts);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <>
    
    <h1>Products</h1>

    <div className="product-container">
      {products.map(product => (
        <div className="product-card" key={product.id}>
          <div className="product-info">
            <p>Product name: {product.title}</p>
            <p> subcategory: {product.subcategory}</p>
            <p>Price(RS): {product.price}</p>
            <p>Popularity: {product.popularity}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default ProductDisplay;
