function StatsPanel({ 
  total, 
  max, 
  maxName, 
  min, 
  minName, 
  longTitles, 
  totalPrice, 
  avgDiscount,
  bestProduct,
  bestRating,
  totalStock,
  mostCommonCategory
}) {
  if (total === 0) return null;

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded border">
      <h2 className="text-xl font-bold mb-3">Estadísticas</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <p>Productos totales: {total}</p>
          <p>Precio máximo: ${max?.toFixed(2)} ({maxName?.slice(0, 20)}...)</p>
          <p>Precio mínimo: ${min?.toFixed(2)} ({minName?.slice(0, 20)}...)</p>
          <p>Mejor valorado: {bestRating?.toFixed(1)}⭐ ({bestProduct}...)</p>
        </div>
        <div className="space-y-2">
          <p>Stock total: {totalStock}</p>
          <p>Categoría más común: {mostCommonCategory}</p>
          <p>Títulos largos (+20 caracteres): {longTitles}</p>
          <p>Valor total: ${totalPrice?.toFixed(2)}</p>
          <p>Descuento promedio: {avgDiscount?.toFixed(1)}%</p>
        </div>
      </div>  
    </div>
  );
}

export default StatsPanel;