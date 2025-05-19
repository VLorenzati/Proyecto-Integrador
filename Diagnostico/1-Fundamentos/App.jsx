
function App() {

  const nombre = "Ana";
  const  edad = "22";
  console.log(`Hola, me llamo ${nombre} y tengo ${edad}`);


  const numeros = [3, 7, 12, 5, 2];
  const cuadrados = numeros.map(numero => numero * numero);
  console.log(cuadrados);


  const mayoresA5 = numeros.filter(numero => numero > 5);
  console.log(mayoresA5);


  const esParOImpar = (numero) => {if (numero % 2 === 0) {return "par";} else {return "impar";}};
  console.log(esParOImpar(3)); // "impar"
  console.log(esParOImpar(12)); // "par"
  

  return(
    <div>
      <h1>1-Fundamentos de JavaScript</h1>
    </div>);
} 

export default App;
 