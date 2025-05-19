
function App() {
  const persona = {
    nombre: "Lucía",
    edad: "28",
    profesion: "Diseñadora",
  };

  const { nombre, edad, profesion } = persona;
  console.log(`${nombre} tiene ${edad} años y trabaja como ${profesion}.`);


  return(
    <div>
      <h1>2-Desestructuración y objetos</h1>
    </div>);
} 

export default App;
