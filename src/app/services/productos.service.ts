import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends ApiService {
  
  //Generamos un Array que contenga en cada posición un array con los atributos de cada producto.
 
  
  constructor(http : HttpClient ) {
    super(http);
    this.baseURL= this.baseURL + "/productos";    
  }

  
  // Atributos del producto: Tipo(int,a,inf,for,dep), subtipo(arriba, abajo, calzado), nombre, descripcion, 
  // imagen, precio, descuento
  public registrarProducto(nombre : string, tipo : string, subtipo : string,  descripcion : string, imagen : string, precio: number, descuento : number) : Observable<any>{
    let producto = {
      tipo : tipo,
      subtipo : subtipo,
      nombre : nombre,
      descripcion : descripcion,
      imagen : imagen,
      precio : precio,
      descuento : descuento
    }
    let datos : String = JSON.stringify({producto: producto});
    return this.post(this.baseURL + '/insertar.php', datos);
    
  }
  public getProductos() : Observable<any>{
    //Utilizamos el método slice para devolver una copia del array
    return this.get(this.baseURL+'/todos.php')
  }


  
}
