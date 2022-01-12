import styled from 'styled-components';
import React from 'react';


const Carrito = ({carrito}) => {

    
    return ( 
        <div>
            <h3>Carrito de compras</h3>
            {carrito.length > 0 ? 
             
                carrito.map( (producto, index) => {
                    return (
                        <Producto key={index}>
                            <NombreProducto>{producto.nombre}</NombreProducto>
                            Cantidad:{producto.cantidad}
                        </Producto>
                    )
                } )
             :
             
             <p>Aun no has agregado productos al carrito.</p>
             }
        </div>
     );
}


const Producto = styled.div`
    padding: 1opx;
    border-bottom: 1px solid #ebebf3;
    font-size: 14px;
    margin-top: 10px;

`

const NombreProducto = styled.p`
    font-weight: bold;
    font-size: 16px;
    color: #000
`
 
export default Carrito;