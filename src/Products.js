import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = useMemo(() => {
    if (!products) return [];

    switch (sortOption) {
      case "title":
        return products.toSorted((a, b) => a.title.localeCompare(b.title));
      case "price":
        return products.toSorted((a, b) => a.price - b.price);
      default:
        return products; 
    }
  }, [products, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <h1>Products</h1>
      <div>
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
      </div>
      <ul>
        {sortedProducts.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} width="100" />
              <h2>{product.title}</h2>
              <p>${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
