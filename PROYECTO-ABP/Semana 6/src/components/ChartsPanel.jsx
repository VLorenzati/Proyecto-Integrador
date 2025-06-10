import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

function ChartsPanel({ products }) {
  //Grafico de barras
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.entries(categoryCounts).map(([category, count]) => ({
    category,
    count
  }));

  //Grafico de líneas: evolución de precios (simulada)
  const lineData = products.map((p) => ({
    name: p.title.slice(0, 10) + "...",
    price: p.price + Math.random() * 10 - 5  // Precio con variación simulada
  }));

  //Grafico de torta: proporción de productos por stock
  const pieData = [
    { name: 'Stock > 100', value: products.filter(p => p.stock > 100).length },
    { name: 'Stock 50-100', value: products.filter(p => p.stock <= 100 && p.stock > 50).length },
    { name: 'Stock <= 50', value: products.filter(p => p.stock <= 50).length }
  ];



  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/*Grafico de Barras */}
      
      <div className="bg-white rounded p-4 shadow">
        <h3 className="text-lg font-semibold mb-2">Productos por Categoria</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/*Grafico de linneas */}
      <div className="bg-white rounded p-4 shadow">
        <h3 className="text-lg font-semibold mb-2">Evolucion de Precios (Simulado)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/*grafico de torta*/}
      <div className="bg-white rounded p-4 shadow">
        <h3 className="text-lg font-semibold mb-2">Proporcion por Stock</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartsPanel;