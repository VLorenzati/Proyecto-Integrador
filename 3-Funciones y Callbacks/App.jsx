
function App() {
 
  function procesar(array, callbacks) {
   return array.map(callbacks);
  }
  
  const resultado = procesar([1,2,3], x => x*2)
  console.log(resultado);

  return(
    <div>
      <h1>3-Funciones y callbacks</h1>
    </div>);
} 

export default App;
