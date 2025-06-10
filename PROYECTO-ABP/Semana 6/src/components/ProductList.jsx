function ProductList({ products }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map(product => (
        <div 
          key={product.id}
          className="p-4 border rounded hover:shadow-md transition-all"
        >
          <h3 className="font-bold">{product.title}</h3>
          <p className="text-blue-600">${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;