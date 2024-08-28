import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setTimeout(() => {
          setProducts(data);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortOption(sortValue);

    const sortedProducts = [...products];

    switch (sortValue) {
      case "title":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "price":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        sortedProducts.sort((a, b) => a.id - b.id);
        break;
    }

    setProducts(sortedProducts);
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
        {products.map((product) => (
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
