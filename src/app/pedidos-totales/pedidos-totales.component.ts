import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/pedidos.service';

@Component({
  selector: 'app-pedidos-totales',
  templateUrl: './pedidos-totales.component.html',
  styleUrls: ['./pedidos-totales.component.css']
})
export class PedidosTotalesComponent implements OnInit {
  public errores = [];
  public pedidos = [];
  public cargando;
  constructor(private servicioPedidos : PedidosService) { }

  ngOnInit() {
    this.cargando = true;
    this.servicioPedidos.getTodosLosPedidos().subscribe(
      (respuesta) => {
        this.cargando = false;
        this.pedidos = respuesta;
      },
      (error) => { 
        this.cargando = false;
        let mensaje = error ["error"] ["mensaje"];
        if(!mensaje){
          mensaje = "El servidor no se encuentra disponible."
        }
        this.errores.push(mensaje);
      }
    );
  }

  public cambiarEstado(id_pedido){
    this.errores = [];
    this.cargando = true;
    this.servicioPedidos.cambiarEstadoPedido(id_pedido).subscribe(
      (respuesta) => {
        this.cargando = false;
        this.pedidos = respuesta;
      },
      (error)=>{
        this.cargando = false;
        let mensaje = error ["error"] ["mensaje"];
        if(!mensaje){
          mensaje = "El servidor no se encuentra disponible."
        }
        this.errores.push(mensaje);
      }
    )
  }
}
