import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  //Generamos un Array que contenga en cada posición un array con los atributos de cada producto.
  private productos = [
    {
      nombre : 'camiseta interior',
      tipo : 'int',
      subtipo : 'arriba',
      descripcion : 'camiseta interior de algodon 100%',
      imagen : 'imagen_cualquiera',
      precio : 10.0,
      descuento : null
    }
  ];
  
  constructor() {
    
  }
  
  // Atributos del producto: Tipo(int,a,inf,for,dep), subtipo(arriba, abajo, calzado), nombre, descripcion, 
  // imagen, precio, descuento
  public registrarProducto(nombre : string, tipo : string, subtipo : string,  descripcion : string, imagen : string, precio: number, descuento : number){
    let producto = {
      tipo : tipo,
      subtipo : subtipo,
      nombre : nombre,
      descripcion : descripcion,
      imagen : imagen,
      precio : precio,
      descuento : descuento
    }
    
    this.productos.push(producto);
  }
  public getProductos(){
    //Utilizamos el método slice para devolver una copia del array
    return this.productos.slice();
  }
  
}
