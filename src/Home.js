import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [lastVisitedProductId, setLastVisitedProductId] = useState(null);

  useEffect(() => {
    const lastProductId = localStorage.getItem('lastVisitedProduct');
    if (lastProductId) {
      setLastVisitedProductId(lastProductId);
    }
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to our website!</p>
      {lastVisitedProductId && (
        <div>
          <Link to={`/products/${lastVisitedProductId}`}>
            Wróć do przeglądania produktu
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
