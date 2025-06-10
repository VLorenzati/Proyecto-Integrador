import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';


// Compoentes
import ProductList from './components/ProductList';
import StatsPanel from './components/StatsPanel';
import SearchBar from './components/Searchbar';
import ChartsPanel from './components/ChartsPanel';





function App() {
  // Estados
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);
  const [format, setFormat] = useState("");

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');



  // Referencia al contenedor
  const containerRef = useRef(null);


  const limit = 30; 

  // Fetching
  useEffect(() => {
        axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`).then((res) => {
            setProducts(res.data.products);
        });
    }, [page]);

  // Categorias
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Filtrado de productos
  const filteredProducts = products
    .filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter === 'all' || p.category === categoryFilter)
    )
    .sort((a, b) => {
      if (!sortBy) return 0;
      const dir = sortOrder === 'asc' ? 1 : -1;
      return (a[sortBy] - b[sortBy]) * dir;
    });

  // Calculo de estadisticas
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
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    

    return {
      total: filteredProducts.length,
      max: maxProduct.price,
      maxName: maxProduct.title,
      min: minProduct.price,
      minName: minProduct.title,
      longTitles: filteredProducts.filter(p => p.title.length > 20).length,
      totalPrice: prices.reduce((a, b) => a + b, 0),
      avgPrice, 
      avgDiscount: discounts.reduce((a, b) => a + b, 0) / discounts.length,
      bestProduct: highestRated.title.slice(0, 20),
      bestRating: highestRated.rating,
      totalStock,
      mostCommonCategory
    }
  };

  const stats = calculateStats();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    containerRef.current.classList.toggle("dark-mode");
  };



  const handleExport = () => {
    if (filteredProducts.length === 0) {
      alert("Error: No hay productos para exportar.");
      return;
    }

    if (format === "json") {
      const blob = new Blob([JSON.stringify(filteredProducts, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, "productos.json");
      alert("Archivo JSON descargado con éxito.");
    } else if (format === "csv") {
      const headers = Object.keys(filteredProducts[0]).join(",");
      const rows = filteredProducts.map(p =>
        Object.values(p).map(value => {
          // Escapar comas y comillas para CSV
          const str = String(value).replace(/"/g, '""');
          return `"${str}"`;
        }).join(",")
      );
      const csvContent = [headers, ...rows].join("\n");

      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, "productos.csv");
      alert("Archivo CSV descargado con éxito.");
    } else {
      alert("Seleccioná un formato válido.");
    }
  };


  const triggerDownload = (url, filename) => {
        //Hipervinculo
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  };



  // Renderizado
  return (
    <div ref={containerRef} className="container mx-auto p-4 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

        <div className="space-x-2">
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Modo {darkMode ? 'Claro' : 'Oscuro'}
          </button>

          <button
            onClick={() => setShow(!show)}
            className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            {show ? 'Ocultar estadísticas' : 'Mostrar estadísticas'}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
   <div>

    <label className="block text-sm font-medium">Filtrar por categoría:</label> {/*Ordenar por categoria */}
    <select
      className="p-2 border rounded"
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium">Ordenar por:</label> {/*Ordenar por Precio, rating*/}
    <select
      className="p-2 border rounded"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="">-- Ninguno --</option>
      <option value="price">Precio</option>
      <option value="rating">Rating</option>
    </select>
  </div>


  <div>
    <label className="block text-sm font-medium">Orden:</label>
    <select
      className="p-2 border rounded"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="asc">Ascendente</option>
      <option value="desc">Descendente</option>
    </select>
  </div>


  <div className="flex items-center gap-4 mt-4">
    <select onChange={(e) => setFormat(e.target.value)} value={format}>
                <option value="">Seleccionar formáto</option>
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
            </select>
            <button onClick={handleExport}>Exportar archivo</button>
  
  </div>
</div>
      {/* Render condicional de estadisticas */}
      {show && <StatsPanel {...stats} />}

      <ChartsPanel products={filteredProducts} />

      {/* Render condicional si no hay productos */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron productos</p>
      ) : (
        <ProductList products={filteredProducts} />
      )}
      <div className="flex justify-between mt-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Página anterior
        </button>
        <span>Página {page}</span>
        <button onClick={() => setPage(page + 1)}>Página siguiente</button>
      </div>
  </div>
  
  
);
}

export default App;