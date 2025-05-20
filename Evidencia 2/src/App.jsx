import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import StatsPanel from './components/StatsPanel';

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=50')
      .then(res => setProducts(res.data.products));
  }, []);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Cálculo de estadísticas
  const calculateStats = () => {
    if (filteredProducts.length === 0) return {};
    
    const prices = filteredProducts.map(p => p.price);
    const discounts = filteredProducts.map(p => p.discountPercentage);
    const maxProduct = filteredProducts.reduce((a, b) => a.price > b.price ? a : b);
    const minProduct = filteredProducts.reduce((a, b) => a.price < b.price ? a : b);
    
    // Nuevas estadísticas
    const highestRated = filteredProducts.reduce((a, b) => a.rating > b.rating ? a : b);
    const totalStock = filteredProducts.reduce((sum, p) => sum + p.stock, 0);
    const categoryCounts = filteredProducts.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    const mostCommonCategory = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])[0][0];

    return {
      total: filteredProducts.length,
      max: maxProduct.price,
      maxName: maxProduct.title,
      min: minProduct.price,
      minName: minProduct.title,
      longTitles: filteredProducts.filter(p => p.title.length > 20).length,
      totalPrice: prices.reduce((a, b) => a + b, 0),
      avgDiscount: discounts.reduce((a, b) => a + b, 0) / discounts.length,
      bestProduct: highestRated.title.slice(0, 20),
      bestRating: highestRated.rating,
      totalStock,
      mostCommonCategory
    }
  };

  const stats = calculateStats();

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Buscar productos..."
        className="w-full p-2 mb-4 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <StatsPanel {...stats} />
      
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;