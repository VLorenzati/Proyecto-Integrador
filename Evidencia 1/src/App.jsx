import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://dummyjson.com/products?limit=50")
            .then((res) => setProducts(res.data.products));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl mb-4">Productos</h1>

            <div className="grid grid-cols-2 md:grid-cols-4">
                {products.map((p) => (
                    <div key={p.id} className="border p-4 m-2">
                        <h3 className="font-medium">{p.title}</h3>
                        <p>${p.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;