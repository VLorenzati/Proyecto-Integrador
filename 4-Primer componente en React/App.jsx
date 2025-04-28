import Saludo from './components/Saludo';
import Presentacion from './components/Presentacion';

function App() {
  return (
    <div>
      <Saludo nombre = "Martin" />
      <Presentacion nombre = "Martin" edad= "19" profesion="Estudiante" />

    </div>
  );
} 

export default App;
