import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/pedidos.service';

@Component({
  selector: ' app-mis-pedidos ',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: [ './mis-pedidos.component.css' ]
})
export class MisPedidosComponent implements OnInit {

  public pedidos = [];
  public cargando : boolean;
  public error : boolean;
  public error_mensaje : string;
  public mensaje : string;
  constructor( private servicioPedidos : PedidosService ) { }

  ngOnInit() {
    this.cargando = true;
    
    this.servicioPedidos.getMisPedidos().subscribe(
      (respuesta) => {
        this.pedidos = respuesta.sort(pedido => pedido.fecha).reverse();
        this.cargando = false;
      },
      (error) => {
        this.cargando = false;
        this.error = true;
        this.error_mensaje = error["error"]["mensaje"];
        if(!this.error_mensaje){
          this.error_mensaje = "El servidor no está disponible";
        }
      }
    );
  }

  public cancelarPedido(id_pedido){
    this.cargando = true;
    this.error = false;
    this.servicioPedidos.cancelarPedido(id_pedido).subscribe(
      (respuesta) => {
        this.pedidos = respuesta.sort(pedido => pedido.fecha).reverse();
        this.cargando = false;
      },
      (error) => {
        this.cargando = false;
        this.error = true;
        this.error_mensaje = error["error"]["mensaje"];
        if(!this.error_mensaje){
          this.error_mensaje = "El servidor no está disponible";
        }
      }
    );
  }


}
