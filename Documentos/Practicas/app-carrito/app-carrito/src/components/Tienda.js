import React from 'react';
import Productos from './Productos';

const Tienda = ({arrayProductos, agregarAlCarrito}) => {
    return ( 
        <>
            <h1>Tienda</h1>
            <Productos arrayProductos={arrayProductos} agregarAlCarrito = {agregarAlCarrito}/>
            
        </>
       
     );
}
 
export default Tienda;