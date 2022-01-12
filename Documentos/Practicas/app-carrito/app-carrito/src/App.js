import React, {useState} from 'react';
import styled from 'styled-components';
import { NavLink, Routes, Route } from 'react-router-dom';
import Inicio from './components/inicio';
import Tienda from './components/Tienda';
import Error404 from './components/Error404';
import Blog from './components/Blog';
import Carrito from './components/Carrito';

const App = () => {

  const arrayProductos = [
    {id: 1, nombre: 'Producto 1'},
    {id: 2, nombre: 'Producto 2'},
    {id: 3, nombre: 'Producto 3'},
    {id: 4, nombre: 'Producto 4'}
  
  ];
  
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (idProductoAAgregar, nombre) => {

      //Si carrito no tiene elementos, agregamos uno.
      if (carrito.length === 0) {
        setCarrito([{id: idProductoAAgregar, nombre: nombre, cantidad: 1}])
      } else {
          //Primero debemos chequear si el producto ya esta en el carrito
          //Si esta, actualizamos el valor
          //Si no esta, lo agregamos
          //Para actualizar el arreglo debemos clonarlo. No podemos editar 'carrito' directamente.
          
          const nuevoCarrito = [...carrito];

          //Comprobamos si el carrito ya tiene el id del producto, en se caso solo modificamos la cantidad.

          const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito) => {

            /**Primero debemos clonar el carrito original para poder modificarlo. Luego quiero filtrar de este nuevo arreglo,
            los elementos que cumplan con la condicion especificada en el return (productoNuevoCarrito.id === idProductoAAgregar).
            .filter devuelve un nuevo array. Si algun producto (cada producto de la iteracion ahora se llama productoNuevoCarrito)
            cumple esta condicion, o, si este nuevo arreglo,
            tiene un length>0 (qye es lo mismo), quiere decir que este producto ya esta en el carrito.
            Si se cumple esta ultima condicion, length>0, devuelve un booleano que quedara en yaEstaEnCarrito.
            */
            return productoDeCarrito.id === idProductoAAgregar
            
          }).length > 0;

          //Si el producto ya esta en carrito, lo tenemos que actualizar.

          if(yaEstaEnCarrito){
            //Para ello tenemos que buscar que item es, y su posicion en el arreglo.
            //A partir de ahi lo actualizamos
            //Por cada elem. si se cumple que el producto que ya esta en el carrito (productoDeCarrito.id)
            //es igual al producto a agregar, guardamos en cantidad, la cantidad que ya tiene (nuevoCarrito[index].cantidad),
            //y luego en esa posicion establecemos el objeto sumandole uno a la cantidad que ya tenia.
            nuevoCarrito.forEach((productoDeCarrito, index) => {
              if (productoDeCarrito.id === idProductoAAgregar) {
                const cantidad = nuevoCarrito[index].cantidad;
                nuevoCarrito[index] = {id: idProductoAAgregar, nombre: nombre, cantidad: cantidad+1};
                
              }
            });

          } else {
            //Si el elemento no esta en el carrito, lo debemos agregar por primera vez al nuevo arreglo de carrito.
            nuevoCarrito.push(
              {id: idProductoAAgregar, nombre: nombre, cantidad: 1}
            );
          };


          //Por ultimo actualizamos el carrito, con el nuevoCarrito que contiene todos los cambios.
      setCarrito(nuevoCarrito);

      }

      
  }

  return ( 
    <>
      <Contenedor>
        <Menu>
          <NavLink to="/" exact="true">Home</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to='/tienda'>Tienda</NavLink>
        </Menu>  
        <main>
          <Routes>
            <Route path="/" element={<Inicio/>} exact="true"/>
            <Route path="/blog" element={<Blog/>} />
            <Route path="/tienda" element={<Tienda arrayProductos={arrayProductos} agregarAlCarrito = {agregarAlCarrito} />}/>
            <Route element={<Error404/>}/>
          </Routes>
          
        </main> 
        <aside>
          <Carrito carrito = {carrito}/>
        </aside>
      </Contenedor>
      

    </>
      
   );
}
 
const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;
 
const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;
export default App;
