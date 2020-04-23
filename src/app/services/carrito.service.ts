import { Injectable, Output, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService extends ApiService {

  @Output() cantidadCambiada : EventEmitter<number> = new EventEmitter<number>();

  constructor(http : HttpClient, private servicioUsuarios : UsuariosService) {
    super(http);
    this.baseURL= this.baseURL + "/carrito";
   }
  public agregarAlCarrito(id_producto, cantidad, talla):Observable<any>{
    let producto = {
      id_producto : id_producto,
      cantidad : cantidad,
      id_usuario : this.servicioUsuarios.id_usuario(),
      talla : talla
    }
    let datos : String = JSON.stringify({producto: producto});
    return this.post(this.baseURL + '/insertar.php', datos);
  }
  public numeroElementos(){
    return 3;
  }
  public getProductos():Observable<any>{
    let idUsuario = this.servicioUsuarios.id_usuario();
    let params = new HttpParams().set("id_usuario", ""+idUsuario)
    // Le metemos params para enviar la id del usuario que queremos conseguir
    return this.getConParametros(this.baseURL + "/todos.php", {params : params});
  }

  public anunciarCantidadCambiada(cantidad : number){
    this.cantidadCambiada.emit(cantidad);
  }
}
