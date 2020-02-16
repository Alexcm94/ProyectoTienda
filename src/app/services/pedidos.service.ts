import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidosService extends ApiService {

  constructor(private servicioUsuarios : UsuariosService, http : HttpClient) { 
    super(http);
    this.baseURL= this.baseURL + "/pedidos";  
  }

  public realizarPedido() : Observable<any>{
    let idUsuario = this.servicioUsuarios.id_usuario();
    let datos : String = JSON.stringify({id_usuario:idUsuario});
    return this.post(this.baseURL + '/insertar.php', datos);
  }

  public getMisPedidos(){
    let misPedidos = [
      {
        id : "10",
        estado : "PENDIENTE",
        fecha : "2020-05-11",
        lineas: [
          {
            nombre : "Camisa",
            precio_final : 10
          },
          {
            nombre : "Calzoncillos",
            precio_final : 10
          }
        ]
      },
      {
        id : 5,
        estado : "ENVIADO",
        fecha : "2020-06-21",
        lineas: [
          {
            nombre : "Zapatos",
            precio_final : 10
          },
          {
            nombre : "Deportivas",
            precio_final : 10
          }
        ]
      }
    ];
    return misPedidos;
  }
}
