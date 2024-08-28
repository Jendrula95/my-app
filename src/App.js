import Home from './Home'
import Products from './Products'
import ProductDetails from './ProductDetails'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div>
<Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
      </div>
   
</Router>
   
  );
}

export default App;
