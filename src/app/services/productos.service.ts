import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService extends ApiService {

  @Output() productosCambiados : EventEmitter<any> = new EventEmitter<any>();
  
  //Generamos un Array que contenga en cada posición un array con los atributos de cada producto.
 
  
  constructor(http : HttpClient ) {
    super(http);
    this.baseURL= this.baseURL + "/productos";    
  }

  
  // Atributos del producto: Tipo(int,a,inf,for,dep), subtipo(arriba, abajo, calzado), nombre, descripcion, 
  // imagen, precio, descuento
  public registrarProducto(datos) : Observable<any>{
    return this.post(this.baseURL + '/insertar.php', datos, true);
  }
  public getProductos() : Observable<any>{
    //Utilizamos el método slice para devolver una copia del array
    return this.get(this.baseURL+'/todos.php');
  }

  public eliminarProducto(id) : Observable<any> {
    let datos : String = JSON.stringify({id_producto : id});
    return this.post(this.baseURL + '/eliminar.php', datos);
  }

  public anunciarProductosCambiados(nuevosProductos) {
    this.productosCambiados.emit(nuevosProductos);
  }
  // Que hago aqui? Se supone que es una peticion get con un parametro pero le tengo que pasar las busqueda. O es un post porque estoy enviando un formulario?
  
  public buscarPalabra(palabra): Observable<any> {
    let params = new HttpParams().set("searchPalabra", ""+palabra);
    return this.getConParametros(this.baseURL + '/buscar.php', {params: params});
  }
  
}
