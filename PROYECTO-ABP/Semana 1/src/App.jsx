import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Compoentes
import ProductList from './components/ProductList';
import StatsPanel from './components/StatsPanel';
import SearchBar from './components/Searchbar';

function App() {
  // Estados
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(true);

  // Fetching
  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then(res => setProducts(res.data.products));
  }, []);

  // Filtrado de productos
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Estadisticas
  const calculateStats = () => {
    if (filteredProducts.length === 0) return {};
    
    const prices = filteredProducts.map(p => p.price);
    const discounts = filteredProducts.map(p => p.discountPercentage);
    const maxProduct = filteredProducts.reduce((a, b) => a.price > b.price ? a : b);
    const minProduct = filteredProducts.reduce((a, b) => a.price < b.price ? a : b);
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

  // Renderizado
  return (
    <div className="container mx-auto p-4">
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

      <button
        onClick={() => setShow(!show)}
        className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
      >
        {show ? 'Ocultar estadísticas' : 'Mostrar estadísticas'}
      </button>

      {/* Render condicional de estadisticas */}
      {show && <StatsPanel {...stats} />}

      {/* Render condicional si no hay productos */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron productos</p>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}

export default App;