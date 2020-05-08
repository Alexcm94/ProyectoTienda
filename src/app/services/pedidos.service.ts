import { Injectable } from "@angular/core";
import { UsuariosService } from "./usuarios.service";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PedidosService extends ApiService {
  constructor(private servicioUsuarios: UsuariosService, http: HttpClient) {
    super(http);
    this.baseURL = this.baseURL + "/pedidos";
  }

  public realizarPedido(): Observable<any> {
    let idUsuario = this.servicioUsuarios.id_usuario();
    let datos: String = JSON.stringify({ id_usuario: idUsuario });
    return this.post(this.baseURL + "/insertar.php", datos);
  }

  public getMisPedidos(): Observable<any> {
    let parametros = {
      id_usuario: this.servicioUsuarios.id_usuario()
    };
    return this.getConParametros(this.baseURL + "/pedidosUsuario.php", {
      params: parametros
    });
  }

  public getTodosLosPedidos() : Observable<any> {
    return this.get(this.baseURL + "/todos.php");
  }
  public cambiarEstadoPedido(id_pedido) : Observable<any>{
    let datos: String = JSON.stringify({ id_pedido: id_pedido });
    return this.post(this.baseURL + "/marcar-como-enviado.php", datos);
  }
  public cancelarPedido(id_pedido) : Observable<any>{
    let datos: String = JSON.stringify({ id_pedido: id_pedido });
    return this.post(this.baseURL + "/cancelar.php", datos);
  }
}
